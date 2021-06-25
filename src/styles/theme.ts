const theme = {
  colors: {
    black: '#29292E',
    shadow: '#050206',
    purple: '#835AFD',
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
    pink: {
      dark: '#E559F9',
      light: '#D67EE2',
      ultraLight: '#F4F0FF',
    },
    hover: {
      purple: '#6F4BD8',
      danger: '#D73754',
      grayMedium: '#7E7E86',
      grayLight: '#CECECE',
    },
  },

  effects: {
    gradients: {
      purple: 'linear-gradient(139.44deg, #485BFF 0%, #FF59F8 96.19%)',
    },
    shadows: {
      default: '0 0.4rem 1.4rem rgba(0, 0, 0, 0.06)',
      light: '0 0.3rem 1.4rem rgba(0, 0, 0, 0.04)',
    },
  },
} as const;

export default theme;
