import { useContext } from "react";
import { UmamiContext } from "./context";

export const useTrack = () => {
  const context = useContext(UmamiContext);

  if (!context) {
    throw new Error('useTrack must be used within a UmamiAnalytics provider');
  }

  return context.track;
};
