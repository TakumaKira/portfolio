export type ColorScheme = 'light' | 'dark';

export const projectTheme = {
  colors: {
    surfacePrimary: {
      light: '#F0F0E3',
      dark: '#38343F',
    },
    surfaceInverse: {
      light: '#4C4C42',
      dark: '#A8A897',
    },
    typePrimary: {
      light: '#494A43',
      dark: '#CCCDBC',
    },
    typeSecondary: {
      light: '#848171',
      dark: '#9F9D92',
    },
    typeInverse: {
      light: '#DBDAD3',
      dark: '#41413D',
    },
    borderPrimary: {
      light: '#ADABA1',
      dark: '#61615F',
    },
    iconPrimary: {
      light: '#ABA99E',
      dark: '#807E76',
    },
    toggleBg: {
      light: '#C8C6B8',
      dark: '#56554D',
    },
    toggleKnob: {
      light: '#9A998E',
      dark: '#8E8D80',
    },
  },
  colorTransitionDuration: 0.2,
  shadows: {
    buttonInverse: {
      light: '0px 0px 1px 1px #48484840',
      dark: '0px 0px 1px 1px #21201D59',
    },
    toggleKnob: {
      light: '0px 0px 2px 0px #5048208c',
      dark: '0px 0px 1px 0px #3E3D3940',
    },
  },
  // fonts are available as css variables in the global scope, using `next/font/local`
  fonts: {
    main: '--font-permanent-marker',
    sub: '--font-caveat',
    normal: '--font-pt-serif-regular',
  },
  rootFontSize: {
    /** px */
    default: 16,
    /** px */
    mobile: 12,
  },
  breakPoints: {
    /** px */
    minViableWidth: 390,
    /** px */
    minWidthTablet: 700,
    /** px */
    minWidthDesktop: 1200,
  },
} as const
export type ProjectTheme = typeof projectTheme;
