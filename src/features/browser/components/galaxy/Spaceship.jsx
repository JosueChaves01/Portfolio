import { forwardRef } from 'react';
import { AdditiveBlending } from 'three';

const HULL = '#cbd5e1';
const TRIM = '#c084fc';

/**
 * Low-poly starship built from primitives. Its nose points down -Z, like the camera.
 * `engineRef` is scaled by the controller to show thrust.
 */
export const Spaceship = forwardRef(function Spaceship({ engineRef, glowTexture }, ref) {
  return (
    <group ref={ref}>
      {/* Fuselage */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.38, 2.1, 8]} />
        <meshStandardMaterial color={HULL} metalness={0.6} roughness={0.35} flatShading />
      </mesh>
      {/* Cockpit canopy */}
      <mesh position={[0, 0.2, -0.15]} scale={[0.6, 0.45, 1.1]}>
        <sphereGeometry args={[0.32, 16, 12]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.6} metalness={0.2} roughness={0.1} />
      </mesh>
      {/* Swept wings */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.85, -0.05, 0.45]} rotation={[0, side * -0.45, side * -0.08]}>
            <boxGeometry args={[1.5, 0.06, 0.7]} />
            <meshStandardMaterial color={HULL} metalness={0.6} roughness={0.4} flatShading />
          </mesh>
          <mesh position={[side * 1.5, 0.05, 0.75]} rotation={[0, 0, side * 0.25]}>
            <boxGeometry args={[0.06, 0.45, 0.5]} />
            <meshStandardMaterial color={TRIM} emissive={TRIM} emissiveIntensity={0.7} />
          </mesh>
          {/* Engine nacelle */}
          <mesh position={[side * 0.42, -0.05, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.2, 0.7, 10]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {/* Engine glow, scaled with thrust */}
      <group ref={engineRef} position={[0, -0.05, 1.35]}>
        {[-0.42, 0.42].map((x) => (
          <sprite key={x} position={[x, 0, 0]} scale={[0.9, 0.9, 1]}>
            <spriteMaterial map={glowTexture} color="#fb923c" transparent depthWrite={false} blending={AdditiveBlending} />
          </sprite>
        ))}
      </group>
      <pointLight color="#fb923c" intensity={1.2} distance={6} decay={0} position={[0, 0, 1.6]} />
    </group>
  );
});
