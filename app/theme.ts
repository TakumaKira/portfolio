export type ColorScheme = 'light' | 'dark';

export const projectTheme = {
  colors: {
    surfacePrimary: {
      light: '#F0F0E3',
      dark: '#38343F',
    },
    typePrimary: {
      light: '#494A43',
      dark: '#CCCDBC',
    },
    borderPrimary: {
      light: '#ADABA1',
      dark: '#61615F',
    },
  },
  // fonts are available as css variables in the global scope, using `next/font/local`
  fonts: {
    main: '--font-permanent-marker',
  },
  breakPoints: {
    maxWidthMobile: '390px',
  },
} as const
export type ProjectTheme = typeof projectTheme;
