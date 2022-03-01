export type HexEvent = 'none' | 'ping' | 'bounce' | 'spin' | 'pulse';

export interface UserConfigurations {
  theme?: 'dark' | 'light';
  showIntro: boolean;
  hexEvent: HexEvent;
}
