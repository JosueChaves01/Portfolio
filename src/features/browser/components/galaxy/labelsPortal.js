import { createContext, useContext } from 'react';

// Labels render into a DOM layer owned by GalaxyView instead of the canvas wrapper,
// so unmounting the canvas never tries to remove label nodes it already detached.
export const LabelsPortalContext = createContext(null);
export const useLabelsPortal = () => useContext(LabelsPortalContext);
