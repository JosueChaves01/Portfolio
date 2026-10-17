import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Euler, Matrix4, Quaternion, Vector3 } from 'three';
import { FLIGHT, KEY_BINDINGS, WORLD_RADIUS } from '../../constants/galaxy.constants';

const UP = new Vector3(0, 1, 0);
const COORD_INTERVAL = 0.1;

/**
 * Free-flight camera: drag to look, WASD/QE to move, wheel or pinch to fly forward.
 * Keyboard and wheel only respond while the map is engaged so the page keeps scrolling normally.
 */
export function FlyControls({ engagedRef, inputRef, flyTargetRef, systems, onTelemetry, onEngage, reducedMotion }) {
  const { camera, gl } = useThree();
  const look = useRef({ yaw: 0, pitch: 0 });
  const velocity = useRef(new Vector3());
  const pointers = useRef(new Map());
  const pinchDistance = useRef(null);
  const wheelImpulse = useRef(0);
  const coordTimer = useRef(0);
  const scratch = useRef({ move: new Vector3(), matrix: new Matrix4(), quat: new Quaternion(), euler: new Euler(0, 0, 0, 'YXZ') });

  const syncLookFromCamera = () => {
    const euler = scratch.current.euler.setFromQuaternion(camera.quaternion, 'YXZ');
    look.current.yaw = euler.y;
    look.current.pitch = euler.x;
  };

  const cancelFlight = () => {
    if (!flyTargetRef.current) return;
    flyTargetRef.current = null;
    syncLookFromCamera();
  };

  useEffect(() => {
    syncLookFromCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const element = gl.domElement;
    const keys = inputRef.current;

    const onPointerDown = (event) => {
      onEngage();
      element.setPointerCapture?.(event.pointerId);
      pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    };

    const onPointerMove = (event) => {
      const previous = pointers.current.get(event.pointerId);
      if (!previous) return;
      pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (pointers.current.size === 2) {
        const [a, b] = [...pointers.current.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinchDistance.current !== null) wheelImpulse.current -= (distance - pinchDistance.current) * FLIGHT.PINCH_FACTOR;
        pinchDistance.current = distance;
        cancelFlight();
        return;
      }

      const dx = event.clientX - previous.x;
      const dy = event.clientY - previous.y;
      if (dx === 0 && dy === 0) return;
      cancelFlight();
      look.current.yaw -= dx * FLIGHT.LOOK_SENSITIVITY;
      look.current.pitch = Math.max(-FLIGHT.MAX_PITCH, Math.min(FLIGHT.MAX_PITCH, look.current.pitch - dy * FLIGHT.LOOK_SENSITIVITY));
    };

    const onPointerUp = (event) => {
      pointers.current.delete(event.pointerId);
      if (pointers.current.size < 2) pinchDistance.current = null;
    };

    const onWheel = (event) => {
      if (!engagedRef.current) return;
      event.preventDefault();
      cancelFlight();
      wheelImpulse.current += event.deltaY * FLIGHT.WHEEL_FACTOR;
    };

    const onKeyDown = (event) => {
      const action = KEY_BINDINGS[event.code];
      if (!engagedRef.current || !action) return;
      event.preventDefault();
      if (action !== 'boost') cancelFlight();
      keys.add(action);
    };

    const onKeyUp = (event) => {
      const action = KEY_BINDINGS[event.code];
      if (action) keys.delete(action);
    };

    const onBlur = () => keys.clear();

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerUp);
    element.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
      element.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, engagedRef, inputRef, onEngage]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const { move, matrix, quat, euler } = scratch.current;
    const target = flyTargetRef.current;

    if (target) {
      if (reducedMotion) {
        camera.position.copy(target.position);
        camera.lookAt(target.lookAt);
      } else {
        camera.position.lerp(target.position, 1 - Math.exp(-FLIGHT.TRAVEL_EASE * delta));
        matrix.lookAt(camera.position, target.lookAt, UP);
        quat.setFromRotationMatrix(matrix);
        camera.quaternion.slerp(quat, 1 - Math.exp(-FLIGHT.TURN_EASE * delta));
      }
      velocity.current.set(0, 0, 0);
      if (camera.position.distanceTo(target.position) < FLIGHT.ARRIVE_DISTANCE) {
        camera.lookAt(target.lookAt);
        flyTargetRef.current = null;
        syncLookFromCamera();
      }
    } else {
      euler.set(look.current.pitch, look.current.yaw, 0, 'YXZ');
      camera.quaternion.setFromEuler(euler);

      const keys = inputRef.current;
      const forward = (keys.has('forward') ? 1 : 0) - (keys.has('back') ? 1 : 0);
      const strafe = (keys.has('right') ? 1 : 0) - (keys.has('left') ? 1 : 0);
      const vertical = (keys.has('up') ? 1 : 0) - (keys.has('down') ? 1 : 0);
      const speed = FLIGHT.SPEED * (keys.has('boost') ? FLIGHT.BOOST : 1);

      move.set(strafe, vertical, -forward);
      if (move.lengthSq() > 0) move.normalize();
      move.multiplyScalar(speed).applyQuaternion(camera.quaternion);
      velocity.current.lerp(move, 1 - Math.exp(-FLIGHT.ACCELERATION * delta));
      camera.position.addScaledVector(velocity.current, delta);

      if (wheelImpulse.current !== 0) {
        const step = wheelImpulse.current * Math.min(1, delta * 8);
        wheelImpulse.current -= step;
        if (Math.abs(wheelImpulse.current) < 0.01) wheelImpulse.current = 0;
        move.set(0, 0, step).applyQuaternion(camera.quaternion);
        camera.position.add(move);
      }

      if (camera.position.length() > WORLD_RADIUS) camera.position.setLength(WORLD_RADIUS);
    }

    coordTimer.current += delta;
    if (coordTimer.current > COORD_INTERVAL) {
      coordTimer.current = 0;
      const { x, y, z } = camera.position;
      let nearest = null;
      let nearestDistance = Infinity;
      for (const system of systems) {
        const distance = camera.position.distanceTo(system.vector);
        if (distance < nearestDistance) { nearest = system; nearestDistance = distance; }
      }
      onTelemetry({ coords: `X ${x.toFixed(1)}  Y ${y.toFixed(1)}  Z ${z.toFixed(1)}`, nearest: nearest ? `${nearest.title} · ${nearestDistance.toFixed(0)} u` : '' });
    }
  });

  return null;
}
