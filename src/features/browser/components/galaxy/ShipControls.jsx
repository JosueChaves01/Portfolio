import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Euler, Matrix4, Quaternion, Vector3 } from 'three';
import { CAMERA_FOV, FLIGHT, ORBIT, SHIP, SHIP_KEY_BINDINGS, WORLD_RADIUS } from '../../constants/galaxy.constants';
import { useGlowTexture } from './glowTexture';
import { useGalaxyRuntime } from './galaxyRuntime';
import { Spaceship } from './Spaceship';

const FORWARD = new Vector3(0, 0, -1);
const UP = new Vector3(0, 1, 0);
const TELEMETRY_INTERVAL = 0.1;
const TRAIL_COLOR = new Color('#fb923c');

/**
 * Third-person starship with simple Newtonian physics: thrust accelerates the ship,
 * almost nothing slows it down except the brake, rotation has inertia, the black hole
 * pulls the ship in, and stars push it away. The camera follows on a spring.
 */
export function ShipControls({
  engagedRef, inputRef, flyTargetRef, systems, portal, onTelemetry, onShipTelemetry, onScan, onEngage, reducedMotion,
}) {
  const { camera, gl } = useThree();
  const { playerRef, planetsRef } = useGalaxyRuntime();
  const glowTexture = useGlowTexture();
  const shipRef = useRef();
  const visualRef = useRef();
  const engineRef = useRef();
  const keys = useRef(new Set());
  const drag = useRef(null);
  const steer = useRef({ x: 0, y: 0 });
  const nearestPlanet = useRef(null);
  const timer = useRef(0);

  const physics = useRef(null);
  if (physics.current == null) {
    // Spawn the ship just ahead of the current camera, facing the same way.
    const forward = FORWARD.clone().applyQuaternion(camera.quaternion);
    physics.current = {
      position: camera.position.clone().addScaledVector(forward, SHIP.SPAWN_DISTANCE),
      velocity: new Vector3(),
      quaternion: camera.quaternion.clone(),
      angular: new Vector3(),
      throttle: 0,
    };
  }

  const scratch = useMemo(() => ({
    forward: new Vector3(), offset: new Vector3(), target: new Vector3(), toPortal: new Vector3(),
    euler: new Euler(), delta: new Quaternion(), matrix: new Matrix4(), aim: new Quaternion(), bank: new Quaternion(),
    planetPosition: new Vector3(), up: new Vector3(), portal: portal ? new Vector3(...portal.position) : null,
  }), [portal]);

  const trailRef = useRef(null);
  const pointsRef = useRef();
  if (trailRef.current == null) {
    const positions = new Float32Array(SHIP.TRAIL_POINTS * 3);
    const colors = new Float32Array(SHIP.TRAIL_POINTS * 3);
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    trailRef.current = { geometry, positions, colors, head: 0, filled: false };
  }

  useEffect(() => {
    const element = gl.domElement;
    const pressed = keys.current;

    const onPointerDown = (event) => {
      onEngage();
      element.setPointerCapture?.(event.pointerId);
      drag.current = { x: event.clientX, y: event.clientY };
    };
    const onPointerMove = (event) => {
      if (!drag.current) return;
      // Joystick-style steering: the further you drag from where you pressed, the faster you turn.
      const clamp = (value) => Math.max(-SHIP.MAX_STEER, Math.min(SHIP.MAX_STEER, value));
      steer.current.x = clamp((event.clientX - drag.current.x) * SHIP.MOUSE_STEER);
      steer.current.y = clamp((event.clientY - drag.current.y) * SHIP.MOUSE_STEER);
      if (Math.abs(steer.current.x) + Math.abs(steer.current.y) > 0.05) flyTargetRef.current = null;
    };
    const onPointerUp = () => {
      drag.current = null;
      steer.current.x = 0;
      steer.current.y = 0;
    };
    const onKeyDown = (event) => {
      const action = SHIP_KEY_BINDINGS[event.code];
      if (!engagedRef.current || !action) return;
      event.preventDefault();
      if (action === 'scan') {
        if (!event.repeat && nearestPlanet.current) onScan(nearestPlanet.current.planet, nearestPlanet.current.mesh);
        return;
      }
      if (action !== 'boost') flyTargetRef.current = null;
      pressed.add(action);
    };
    const onKeyUp = (event) => {
      const action = SHIP_KEY_BINDINGS[event.code];
      if (action) pressed.delete(action);
    };
    const onBlur = () => pressed.clear();

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [gl, engagedRef, flyTargetRef, onEngage, onScan]);

  // The trail geometry lives in a ref (it is rewritten every frame), so attach it after mount.
  useEffect(() => {
    pointsRef.current.geometry = trailRef.current.geometry;
  }, []);

  // Leave the camera as the free-flight controls expect it.
  useEffect(() => () => {
    camera.up.set(0, 1, 0);
    camera.fov = CAMERA_FOV;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const ship = physics.current;
    const { forward, offset, target, toPortal, euler, delta: deltaQuat, matrix, aim, bank, planetPosition, up } = scratch;
    const pad = inputRef.current;
    const trail = trailRef.current;
    const held = (action, padAction) => keys.current.has(action) || (padAction && pad.has(padAction));
    let gravity = false;

    const autopilot = flyTargetRef.current;
    if (autopilot) {
      // Autopilot to a selected planet: glide into the view point and face the planet.
      ship.position.lerp(autopilot.position, reducedMotion ? 1 : 1 - Math.exp(-FLIGHT.TRAVEL_EASE * delta));
      matrix.lookAt(ship.position, autopilot.lookAt, UP);
      aim.setFromRotationMatrix(matrix);
      ship.quaternion.slerp(aim, reducedMotion ? 1 : 1 - Math.exp(-FLIGHT.TURN_EASE * delta));
      ship.velocity.set(0, 0, 0);
      ship.angular.set(0, 0, 0);
      if (ship.position.distanceTo(autopilot.position) < FLIGHT.ARRIVE_DISTANCE * 4) flyTargetRef.current = null;
    } else {
      const boosting = held('boost', 'boost');
      const thrusting = held('thrust', 'forward');
      const braking = held('brake', 'back');
      const yaw = (held('yawLeft') ? 1 : 0) - (held('yawRight') ? 1 : 0) - steer.current.x;
      const pitch = (held('pitchUp', 'up') ? 1 : 0) - (held('pitchDown', 'down') ? 1 : 0) - steer.current.y;
      const roll = (held('rollLeft') ? 1 : 0) - (held('rollRight') ? 1 : 0);

      // Rotational inertia: inputs add angular velocity, damping bleeds it off.
      ship.angular.x += pitch * SHIP.PITCH_ACCEL * delta;
      ship.angular.y += yaw * SHIP.YAW_ACCEL * delta;
      ship.angular.z += roll * SHIP.ROLL_ACCEL * delta;
      ship.angular.multiplyScalar(Math.exp(-SHIP.ANGULAR_DAMPING * delta));
      euler.set(ship.angular.x * delta, ship.angular.y * delta, ship.angular.z * delta, 'YXZ');
      ship.quaternion.multiply(deltaQuat.setFromEuler(euler)).normalize();

      forward.copy(FORWARD).applyQuaternion(ship.quaternion);
      ship.throttle += ((thrusting ? (boosting ? 1 : 0.6) : 0) - ship.throttle) * (1 - Math.exp(-6 * delta));
      if (thrusting) ship.velocity.addScaledVector(forward, SHIP.THRUST * (boosting ? SHIP.BOOST_MULTIPLIER : 1) * delta);

      if (held('stop')) {
        ship.velocity.multiplyScalar(Math.exp(-4 * delta));
      } else if (braking) {
        const speed = ship.velocity.length();
        ship.velocity.setLength(Math.max(0, speed - SHIP.BRAKE * delta));
      }
      ship.velocity.multiplyScalar(Math.exp(-SHIP.LINEAR_DAMPING * delta));

      // The black hole is a gravity well: the closer you get, the harder it pulls.
      if (scratch.portal) {
        toPortal.copy(scratch.portal).sub(ship.position);
        const distance = toPortal.length();
        if (distance < SHIP.GRAVITY_RANGE) {
          gravity = true;
          ship.velocity.addScaledVector(toPortal.normalize(), (SHIP.GRAVITY_STRENGTH / (distance * distance + 20)) * delta);
        }
      }

      const maxSpeed = boosting ? SHIP.MAX_BOOST_SPEED : SHIP.MAX_SPEED;
      const speed = ship.velocity.length();
      if (speed > maxSpeed) ship.velocity.setLength(speed + (maxSpeed - speed) * (1 - Math.exp(-2 * delta)));

      // Stars are solid: bounce off softly instead of flying through them.
      for (const system of systems) {
        offset.copy(ship.position).sub(system.vector);
        const distance = offset.length();
        const limit = ORBIT.STAR_RADIUS + SHIP.STAR_COLLISION;
        if (distance < limit && distance > 0.001) {
          offset.normalize();
          ship.position.copy(system.vector).addScaledVector(offset, limit);
          const into = ship.velocity.dot(offset);
          if (into < 0) ship.velocity.addScaledVector(offset, -into * 1.3);
        }
      }

      ship.position.addScaledVector(ship.velocity, delta);
      if (ship.position.length() > WORLD_RADIUS) {
        ship.position.setLength(WORLD_RADIUS);
        ship.velocity.multiplyScalar(-0.3);
      }
    }

    // Ship transform, with a visual bank into turns.
    shipRef.current.position.copy(ship.position);
    shipRef.current.quaternion.copy(ship.quaternion);
    bank.setFromAxisAngle(FORWARD, -ship.angular.y * SHIP.BANK_FACTOR);
    visualRef.current.quaternion.slerp(bank, 1 - Math.exp(-8 * delta));
    const glow = 0.25 + ship.throttle * 1.6;
    engineRef.current.scale.setScalar(glow);

    // Chase camera on a spring, rolling with the ship.
    up.copy(UP).applyQuaternion(ship.quaternion);
    offset.set(...SHIP.CHASE_OFFSET).applyQuaternion(ship.quaternion);
    target.copy(ship.position).add(offset);
    camera.position.lerp(target, reducedMotion ? 1 : 1 - Math.exp(-SHIP.CHASE_STIFFNESS * delta));
    camera.up.lerp(up, 1 - Math.exp(-5 * delta)).normalize();
    forward.copy(FORWARD).applyQuaternion(ship.quaternion);
    camera.lookAt(target.copy(ship.position).addScaledVector(forward, SHIP.CHASE_LOOK_AHEAD));
    const speed = ship.velocity.length();
    const fov = SHIP.FOV_MIN + (SHIP.FOV_MAX - SHIP.FOV_MIN) * Math.min(1, speed / SHIP.MAX_BOOST_SPEED);
    const lens = state.camera;
    if (Math.abs(lens.fov - fov) > 0.05) {
      lens.fov += (fov - lens.fov) * (1 - Math.exp(-3 * delta));
      lens.updateProjectionMatrix();
    }

    playerRef.current.copy(ship.position);

    // Engine trail: a ring buffer of recent engine positions fading to black (additive blend).
    const enginePosition = offset.set(0, 0, 1.6).applyQuaternion(ship.quaternion).add(ship.position);
    trail.positions.set([enginePosition.x, enginePosition.y, enginePosition.z], trail.head * 3);
    trail.head = (trail.head + 1) % SHIP.TRAIL_POINTS;
    if (trail.head === 0) trail.filled = true;
    for (let i = 0; i < SHIP.TRAIL_POINTS; i += 1) {
      const age = (trail.head - 1 - i + SHIP.TRAIL_POINTS) % SHIP.TRAIL_POINTS;
      const fade = Math.max(0, 1 - age / SHIP.TRAIL_POINTS) * (0.2 + ship.throttle);
      trail.colors[i * 3] = TRAIL_COLOR.r * fade;
      trail.colors[i * 3 + 1] = TRAIL_COLOR.g * fade;
      trail.colors[i * 3 + 2] = TRAIL_COLOR.b * fade;
    }
    trail.geometry.attributes.position.needsUpdate = true;
    trail.geometry.attributes.color.needsUpdate = true;
    trail.geometry.setDrawRange(0, trail.filled ? SHIP.TRAIL_POINTS : trail.head);

    timer.current += delta;
    if (timer.current > TELEMETRY_INTERVAL) {
      timer.current = 0;
      let nearestSystem = null;
      let systemDistance = Infinity;
      for (const system of systems) {
        const distance = ship.position.distanceTo(system.vector);
        if (distance < systemDistance) { nearestSystem = system; systemDistance = distance; }
      }
      let closest = null;
      let closestDistance = SHIP.SCAN_RANGE;
      for (const entry of planetsRef.current.values()) {
        entry.mesh.getWorldPosition(planetPosition);
        const distance = planetPosition.distanceTo(ship.position);
        if (distance < closestDistance) { closest = entry; closestDistance = distance; }
      }
      nearestPlanet.current = closest;
      const { x, y, z } = ship.position;
      onTelemetry({
        coords: `X ${x.toFixed(1)}  Y ${y.toFixed(1)}  Z ${z.toFixed(1)}`,
        nearest: nearestSystem ? `${nearestSystem.title} · ${systemDistance.toFixed(0)} u` : '',
      });
      onShipTelemetry({
        speed,
        maxSpeed: SHIP.MAX_BOOST_SPEED,
        throttle: ship.throttle,
        boosting: held('boost', 'boost'),
        gravity,
        nearPlanet: closest ? { id: closest.planet.id, name: closest.planet.name } : null,
      });
    }
  });

  return (
    <>
      <group ref={shipRef}>
        <group ref={visualRef}>
          <Spaceship engineRef={engineRef} glowTexture={glowTexture} />
        </group>
      </group>
      <points ref={pointsRef} frustumCulled={false}>
        <pointsMaterial size={0.45} map={glowTexture} vertexColors transparent depthWrite={false} blending={AdditiveBlending} sizeAttenuation />
      </points>
    </>
  );
}
