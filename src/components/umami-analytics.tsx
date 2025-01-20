import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Umami } from '../types';
import { UmamiContext } from '../hooks/context';

interface EventQueueItem {
  eventName: string;
  data?: Record<string, any>;
}

interface UmamiAnalyticsProps {
  // Umami tracker options

  /**
   * The URL of the Umami tracker script.
   */
  src: string;
  /**
   * The website ID that Umami has provided to track.
   */
  websiteId: string;
  /**
   * Whether to automatically track page views.
   * @default true
   */
  autoTrack?: boolean;
  /**
   * By default, Umami will send data to wherever the script is located. You can override this to send data to another location.
   */
  hostURL?: string;
  /**
   * If you want the tracker to only run on specific domains, you can add them to your tracker script.
   * Helps if you are working in a staging/development environment.
   */
  domains?: string[];
  /**
   * If you want the tracker to collect events under a specific tag. Events can be filtered in the dashboard by a specific tag.
   */
  tag?: string;

  /**
   * Whether to load the script asynchronously.
   */
  async?: boolean;
  /**
   * Whether to defer the script execution.
   */
  defer?: boolean;

  // Component-specific props
  /**
   * Callback that is called when the Umami tracker could not be loaded.
   * @param error The error that occurred.
   */
  onLoadError?: (error: Event | string) => void;
  /**
   * Callback that is called when the Umami tracker has been loaded.
   * @param umami The Umami tracker instance.
   */
  onLoad?: (umami: Umami) => void;
  /**
   * The children to render. Children that calls `umami-react` functions should be here.
   */
  children: ReactNode;
}

export const UmamiAnalytics = ({
  src,
  websiteId,
  autoTrack = true,
  hostURL,
  domains,
  tag,
  async = true,
  defer = true,
  onLoad,
  onLoadError,
  children,
}: UmamiAnalyticsProps) => {
  const [umami, setUmami] = useState<Umami | null>(null);
  const [eventQueue, setEventQueue] = useState<EventQueueItem[]>([]);

  const flushQueue = () => {
    if (umami && eventQueue.length > 0) {
      eventQueue.forEach(({ eventName, data }) => {
        umami.track(eventName, data);
      });

      setEventQueue([]);
    }
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;

    // https://umami.is/docs/tracker-configuration
    script.dataset.websiteId = websiteId;
    if (autoTrack) script.dataset.autoTrack = String(autoTrack);
    if (hostURL) script.dataset.hostUrl = hostURL;
    if (domains) script.dataset.domains = domains.join(',');
    if (tag) script.dataset.tag = tag;

    script.onload = () => {
      // @ts-expect-error
      setUmami(window.umami);
      // @ts-expect-error
      onLoad?.(window.umami);
      flushQueue();
    };

    script.onerror = (e) => {
      onLoadError?.(e);
    }

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [src, websiteId, autoTrack, hostURL, domains, tag, async, defer, onLoad, onLoadError]);

  const track = 
    (eventName: string, data?: Record<string, any>) => {
      if (umami) {
        umami.track(eventName, data);
      } else {
        setEventQueue((prevQueue) => [...prevQueue, { eventName, data }]);
      }
    }

  const identify =(sessionData: Record<string, any>) => {
        umami?.identify(sessionData);
    }

  return (
    <UmamiContext.Provider value={{ track, identify }}>
      {children}
    </UmamiContext.Provider>
  );
};
