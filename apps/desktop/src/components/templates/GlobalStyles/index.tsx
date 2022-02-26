import { COLORS, SIZES } from '../../../constants';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle<{ colorTheme: 'light' | 'dark' }>`
  html {
    --color-text: ${({ colorTheme }) => COLORS[colorTheme].text};
    --color-background: ${({ colorTheme }) => COLORS[colorTheme].background};
    --color-background-secondary: ${({ colorTheme }) => COLORS[colorTheme].backgroundSecondary};
    --color-primary: ${({ colorTheme }) => COLORS[colorTheme].primary};
    --color-secondary: ${({ colorTheme }) => COLORS[colorTheme].secondary};
    --size-extra-small: ${SIZES.extraSmall};
    --size-small: ${SIZES.small};
    --size-medium: ${SIZES.medium};
    --size-large: ${SIZES.large};
    --size-extra-large: ${SIZES.extraLarge};
  }
`;
