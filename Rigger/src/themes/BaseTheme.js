const BaseTheme = {
  spacing: (multiply) => {
    return 2 * multiply
  }
}

BaseTheme.palette = {
  primary: {
    main: '#aaaaaa'
  },
  secondary: {
    main: '#888888'
  }
}
BaseTheme.styles = {
  body: {
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    color: 'black'
  },
  h1: {
    color: 'blue'
  }
}

export default BaseTheme
