export type HexEvent = '' | 'ping' | 'bounce' | 'spin' | 'pulse';

export interface UserConfigurations {
  theme?: 'dark' | 'light';
  showIntro: boolean;
  hexEvent: HexEvent;
}
