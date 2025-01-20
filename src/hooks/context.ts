import { createContext } from "react";

import type { Umami } from '../types';

export const UmamiContext = createContext<Umami>({
  track: (eventName: string, data?: Record<string, any>) => {},
  identify: (sessionData: Record<string, any>) => {},
});