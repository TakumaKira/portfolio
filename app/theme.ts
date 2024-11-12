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
  fonts: {
    main: '--font-permanent-marker',
  },
} as const
export type ProjectTheme = typeof projectTheme;
