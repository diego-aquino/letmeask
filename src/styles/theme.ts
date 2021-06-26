const theme = {
  colors: {
    black: '#29292E',
    shadow: '#050206',
    blue: '#7B77EE',
    danger: '#E73F5D',
    gray: {
      dark: '#737380',
      medium: '#A8A8B3',
      light: '#DBDCDD',
    },
    white: {
      background: '#F8F8F8',
      details: '#FEFEFE',
    },
    purple: {
      dark: '#A931F7',
      light: '#BF7BEB',
      ultraLight: '#ECE5F1',
    },
    hover: {
      blue: '#6965C9',
      danger: '#D73754',
      grayMedium: '#7E7E86',
      grayLight: '#CECECE',
    },
  },

  effects: {
    gradients: {
      blueToPurple: 'linear-gradient(139.44deg, #667EEA 0%, #A931F7 96.19%)',
    },
    shadows: {
      default: '0 0.4rem 1.4rem rgba(0, 0, 0, 0.06)',
      light: '0 0.3rem 1.4rem rgba(0, 0, 0, 0.04)',
    },
  },
} as const;

export default theme;
