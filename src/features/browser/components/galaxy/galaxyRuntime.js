import { createContext, useContext } from 'react';
import { Vector3 } from 'three';

/**
 * Shared runtime refs for the 3D scene:
 * - playerRef: where the "player" is (camera in free mode, the ship in ship mode)
 * - planetsRef: Map of planet id → { planet, mesh } so the ship can find nearby planets
 */
export const GalaxyRuntimeContext = createContext({ playerRef: { current: new Vector3() }, planetsRef: { current: new Map() } });
export const useGalaxyRuntime = () => useContext(GalaxyRuntimeContext);
