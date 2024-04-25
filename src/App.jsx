
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import NavBar from './components/NavBar'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar/>
      {isLoading && (<LoadingScreen/>)}
      <Container className='my-5'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route element={<ProtectedRoutes/>}> 
            <Route path='/purchases' element={<Purchases/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/detail/:id' element={<ProductsDetail/>}/>
        </Routes>
      </Container>
      <footer>
         &copy; Diego Cantillo 
      </footer>
    </HashRouter>
  )
}

export default App
