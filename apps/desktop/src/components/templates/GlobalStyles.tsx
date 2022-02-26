import { COLORS, SIZES } from '../../constants';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle<{ colorMode: 'light' | 'dark' }>`
  html {
    --color-text: ${({ colorMode }) => COLORS[colorMode].text};
    --color-background: ${({ colorMode }) => COLORS[colorMode].background};
    --color-background-secondary: ${({ colorMode }) => COLORS[colorMode].backgroundSecondary};
    --color-primary: ${({ colorMode }) => COLORS[colorMode].primary};
    --color-secondary: ${({ colorMode }) => COLORS[colorMode].secondary};
    --size-extra-small: ${SIZES.extraSmall};
    --size-small: ${SIZES.small};
    --size-medium: ${SIZES.medium};
    --size-large: ${SIZES.large};
    --size-extra-large: ${SIZES.extraLarge};
  }
`;
