import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { AdditiveBlending, CanvasTexture, DoubleSide, Vector3 } from 'three';
import { BLACK_HOLE, FLIGHT } from '../../constants/galaxy.constants';
import { useLabelsPortal } from './labelsPortal';
import { useGalaxyRuntime } from './galaxyRuntime';
import styles from './GalaxyView.module.css';

function useDiskTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(size / 2, size / 2, size * 0.18, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.12, 'rgba(255,214,150,1)');
    gradient.addColorStop(0.35, 'rgba(251,146,60,0.85)');
    gradient.addColorStop(0.7, 'rgba(192,132,252,0.35)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    // Streaks give the disk a sense of rotation.
    context.globalCompositeOperation = 'destination-out';
    let seed = 42;
    const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < 40; i += 1) {
      context.beginPath();
      context.arc(size / 2, size / 2, size * (0.22 + random() * 0.26), random() * Math.PI * 2, random() * Math.PI * 2);
      context.lineWidth = 1 + random() * 2;
      context.strokeStyle = 'rgba(0,0,0,0.35)';
      context.stroke();
    }
    return new CanvasTexture(canvas);
  }, []);
}

/** A portal to another browser window: fly into it (or click it) to travel. */
export function BlackHole({ portal, texture, onEnter }) {
  const diskRef = useRef();
  const outerDiskRef = useRef();
  const triggered = useRef(false);
  const center = useMemo(() => new Vector3(...portal.position), [portal.position]);
  const diskTexture = useDiskTexture();
  const labelsPortal = useLabelsPortal();
  const { playerRef } = useGalaxyRuntime();

  useFrame((_, delta) => {
    diskRef.current.rotation.z += delta * 0.6;
    outerDiskRef.current.rotation.z -= delta * 0.25;
    const player = playerRef.current;
    if (!triggered.current && player.distanceTo(center) < BLACK_HOLE.EVENT_HORIZON) {
      triggered.current = true;
      onEnter(portal.target);
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    if (event.delta > FLIGHT.CLICK_TOLERANCE || triggered.current) return;
    triggered.current = true;
    onEnter(portal.target);
  };

  return (
    <group position={portal.position}>
      <mesh onClick={handleClick}>
        <sphereGeometry args={[BLACK_HOLE.RADIUS, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <group rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh ref={diskRef}>
          <ringGeometry args={[BLACK_HOLE.RADIUS * 1.15, BLACK_HOLE.RADIUS * 3.2, 128]} />
          <meshBasicMaterial map={diskTexture} transparent side={DoubleSide} depthWrite={false} blending={AdditiveBlending} />
        </mesh>
        <mesh ref={outerDiskRef}>
          <ringGeometry args={[BLACK_HOLE.RADIUS * 2.6, BLACK_HOLE.RADIUS * 4.2, 128]} />
          <meshBasicMaterial map={diskTexture} transparent opacity={0.35} side={DoubleSide} depthWrite={false} blending={AdditiveBlending} />
        </mesh>
      </group>
      <sprite scale={[BLACK_HOLE.RADIUS * 9, BLACK_HOLE.RADIUS * 9, 1]}>
        <spriteMaterial map={texture} color="#c084fc" transparent opacity={0.35} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      <Html portal={labelsPortal} position={[0, BLACK_HOLE.RADIUS * 3.4, 0]} center zIndexRange={[10, 0]} distanceFactor={45} style={{ pointerEvents: 'none' }}>
        <span className={styles.portalLabel}>{portal.label}</span>
      </Html>
    </group>
  );
}
