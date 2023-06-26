import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
// Outside porject imports

import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'

import './scss/app.scss'
// import pizzas from './assets/pizzas.json' //Так можно, но зачем если есть сервак

// Inside project imports

const Cart = lazy(() => import(/* webpackChinkName: "Cart" */ './pages/Cart'))
const FullPizza = lazy(
  () => import(/* webpackChinkName: "FullPizza" */ './pages/FullPizza')
)
const NotFound = lazy(
  () => import(/* webpackChinkName: "NotFound" */ './pages/NotFound')
)
// Lazy imports

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="wrapper">
            <div className="container">
              <div className="pizza-loadingPage">
                <h2>Загрузка...</h2>
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
