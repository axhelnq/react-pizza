import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error("Root element with id 'root' not found")
}

const root = createRoot(rootElement)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
