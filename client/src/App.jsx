import Header from './components/Header.jsx'
import MainBackground from './components/MainBackground.jsx'
import Homepage from './pages/Homepage.jsx'
import Store from './pages/Store.jsx'
import Productpage from './pages/Productpage.jsx'
import Profile from './pages/Profile.jsx'
import Registerpage from './pages/Registerpage.jsx'
import Footer from './components/Footer.jsx'


import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext.jsx'
import { ProductsProvider } from './contexts/productsContext.jsx'
import Loginpage from './pages/Loginpage.jsx'


function App() {

  return (
    
      <AuthProvider>
        <ProductsProvider>
          <Header />
          <MainBackground />
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/about-us' element={<Homepage />} />
            <Route path='/contact-us' element={<Homepage />} />
            <Route path='/products' element={<Store />} />
            <Route path='/products/:id' element={<Productpage />} />
            <Route path='/register' element={<Registerpage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Loginpage />} />
          </Routes>
          <Footer />
        </ProductsProvider>
      </AuthProvider>
    
  )
}

export default App

