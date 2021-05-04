import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from './store'
import GlobalStyle from './Styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from './Styles/Theme'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
