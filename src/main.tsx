
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './statemanagement/store.ts'
import { RouterProvider } from 'react-router'
import router from './navigation/router.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
