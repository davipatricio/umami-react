import { useContext } from "react";
import { UmamiContext } from "./context";

export const useIdentify = () => {
  const context = useContext(UmamiContext);

  if (!context) {
    throw new Error('useIdentify must be used within a UmamiAnalytics provider');
  }

  return context.identify;
};
