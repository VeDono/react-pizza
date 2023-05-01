import { Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react'

import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

import './scss/app.scss'
// import pizzas from './assets/pizzas.json' //Так можно, но зачем если есть сервак

export const SearchContext = createContext('')

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  )
}

export default App
