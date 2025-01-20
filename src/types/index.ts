export interface Umami {
  /**
   * Tracks an event
   * @param eventName The name of the event send to Umami 
   * @param [eventData] Optional additional data to send to Umami
   */
  track(eventName: string, data?: Record<string, any>): void;
  /**
   * Identifies a user
   * @param sessionData The data to send to Umami 
   */
  identify(sessionData: Record<string, any>): void;
}
