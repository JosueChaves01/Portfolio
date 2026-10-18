import { useEffect, useMemo, useRef, useState } from 'react';
import { useGalaxyRuntime } from './galaxyRuntime';
import { useGlowTexture } from './glowTexture';
import { BlackHole } from './BlackHole';
import { useLabelsPortal } from './labelsPortal';
import { useFrame } from '@react-three/fiber';
import { Html, Line, Stars } from '@react-three/drei';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, DoubleSide } from 'three';
import { Icon } from '../../../../shared/icons/Icon';
import { FLIGHT, ORBIT } from '../../constants/galaxy.constants';
import styles from './GalaxyView.module.css';

const LABEL_Z_RANGE = [10, 0];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let mixed = Math.imul(value ^ (value >>> 15), 1 | value);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}


function Dust({ systems, texture }) {
  const geometry = useMemo(() => {
    const random = seededRandom(7);
    const total = systems.length * ORBIT.DUST_PER_SYSTEM;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const color = new Color();
    systems.forEach((system, systemIndex) => {
      color.set(system.color);
      for (let i = 0; i < ORBIT.DUST_PER_SYSTEM; i += 1) {
        const index = (systemIndex * ORBIT.DUST_PER_SYSTEM + i) * 3;
        const radius = ORBIT.DUST_SPREAD * Math.sqrt(random()) + 2;
        const theta = random() * Math.PI * 2;
        const height = (random() - 0.5) * ORBIT.DUST_SPREAD * 0.6;
        positions[index] = system.position[0] + Math.cos(theta) * radius;
        positions[index + 1] = system.position[1] + height;
        positions[index + 2] = system.position[2] + Math.sin(theta) * radius;
        colors[index] = color.r;
        colors[index + 1] = color.g;
        colors[index + 2] = color.b;
      }
    });
    const buffer = new BufferGeometry();
    buffer.setAttribute('position', new BufferAttribute(positions, 3));
    buffer.setAttribute('color', new BufferAttribute(colors, 3));
    return buffer;
  }, [systems]);

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.6} map={texture} vertexColors transparent opacity={0.55} depthWrite={false} blending={AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function Hyperlanes({ systems, hub }) {
  // Lanes run from the hub (a core system or the black hole) to every other system.
  const others = systems.filter(({ position }) => position !== hub);
  return (
    <group>
      {others.map((system, index) => {
        const next = others[(index + 1) % others.length];
        return (
          <group key={system.id}>
            <Line points={[hub, system.position]} color={system.color} lineWidth={1} transparent opacity={0.28} dashed dashSize={1.2} gapSize={1} />
            <Line points={[system.position, next.position]} color="#64748b" lineWidth={0.6} transparent opacity={0.16} />
          </group>
        );
      })}
    </group>
  );
}

function Planet({ planet, index, paused, selectedId, onSelect, systemColor }) {
  const orbitRef = useRef();
  const meshRef = useRef();
  const angle = useRef(index * 2.399);
  const [hovered, setHovered] = useState(false);
  const radius = ORBIT.FIRST_RADIUS + index * ORBIT.RADIUS_STEP;
  const speed = ORBIT.BASE_SPEED / Math.sqrt(index + 1);
  const isSelected = selectedId === planet.id;
  const labelsPortal = useLabelsPortal();
  const { planetsRef } = useGalaxyRuntime();

  // Register the planet so the ship can detect and scan nearby planets.
  useEffect(() => {
    const registry = planetsRef.current;
    registry.set(planet.id, { planet, mesh: meshRef.current });
    return () => registry.delete(planet.id);
  }, [planet, planetsRef]);

  useFrame((_, delta) => {
    if (!paused) angle.current += speed * Math.min(delta, 0.05);
    orbitRef.current.rotation.y = angle.current;
    const scale = isSelected ? 1.5 : hovered ? 1.25 : 1;
    meshRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.2);
  });

  const handleClick = (event) => {
    event.stopPropagation();
    if (event.delta > FLIGHT.CLICK_TOLERANCE) return;
    onSelect(planet, meshRef.current);
  };

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.03, radius + 0.03, 128]} />
        <meshBasicMaterial color={systemColor} transparent opacity={isSelected ? 0.6 : 0.18} side={DoubleSide} depthWrite={false} />
      </mesh>
      <group ref={orbitRef}>
        <group position={[radius, 0, 0]}>
          <mesh
            ref={meshRef}
            onClick={handleClick}
            onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }}
          >
            <sphereGeometry args={[ORBIT.PLANET_RADIUS, 32, 32]} />
            <meshStandardMaterial color={planet.color} emissive={planet.color} emissiveIntensity={isSelected || hovered ? 0.9 : 0.35} roughness={0.5} metalness={0.1} />
          </mesh>
          {/* The dossier names the selected planet, so its label would only crowd the close-up. */}
          {!isSelected && (
            <Html portal={labelsPortal} position={[0, 1.1, 0]} center zIndexRange={LABEL_Z_RANGE} distanceFactor={24} style={{ pointerEvents: 'none' }}>
              <span className={`${styles.planetLabel} ${hovered ? styles.planetLabelActive : ''}`} style={{ '--planet-color': planet.color }}>
                <Icon name={planet.icon} size={12} color={planet.color} />
                {planet.name}
              </span>
            </Html>
          )}
        </group>
      </group>
    </group>
  );
}

function StarSystem({ system, texture, paused, selectedId, onSelect, onSelectSystem }) {
  const tilt = useMemo(() => {
    const random = seededRandom(system.id.length * 97 + system.position[0]);
    return [(random() - 0.5) * 0.6, 0, (random() - 0.5) * 0.6];
  }, [system.id, system.position]);
  const labelsPortal = useLabelsPortal();

  return (
    <group position={system.position}>
      <pointLight color={system.color} intensity={2} distance={30} decay={0} />
      <mesh onClick={(event) => { event.stopPropagation(); if (event.delta <= FLIGHT.CLICK_TOLERANCE) onSelectSystem(system); }}>
        <sphereGeometry args={[ORBIT.STAR_RADIUS, 32, 32]} />
        <meshBasicMaterial color={system.color} />
      </mesh>
      <sprite scale={[11, 11, 1]}>
        <spriteMaterial map={texture} color={system.color} transparent opacity={0.85} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      <Html portal={labelsPortal} position={[0, ORBIT.STAR_RADIUS + 2.4, 0]} center zIndexRange={LABEL_Z_RANGE} distanceFactor={30} style={{ pointerEvents: 'none' }}>
        <span className={styles.systemLabel} style={{ '--system-color': system.color }}>{system.title}</span>
      </Html>
      <group rotation={tilt}>
        {system.planets.map((planet, index) => (
          <Planet key={planet.id} planet={planet} index={index} paused={paused} selectedId={selectedId} onSelect={onSelect} systemColor={system.color} />
        ))}
      </group>
    </group>
  );
}

export function GalaxyScene({ systems, hub, portal, onPortal, paused, selectedId, onSelect, onSelectSystem }) {
  const texture = useGlowTexture();

  return (
    <>
      <color attach="background" args={['#06060c']} />
      <fog attach="fog" args={['#06060c', 90, 230]} />
      <ambientLight intensity={0.55} />
      <Stars radius={220} depth={90} count={6000} factor={5} saturation={0.4} fade speed={0.6} />
      <Dust systems={systems} texture={texture} />
      <Hyperlanes systems={systems} hub={hub} />
      {portal && <BlackHole key={portal.target} portal={portal} texture={texture} onEnter={onPortal} />}
      {systems.map((system) => (
        <StarSystem key={system.id} system={system} texture={texture} paused={paused} selectedId={selectedId} onSelect={onSelect} onSelectSystem={onSelectSystem} />
      ))}
    </>
  );
}
