import Header from './components/Header.jsx'
import MainBackground from './components/MainBackground.jsx'
import Homepage from './pages/Homepage.jsx'
import Store from './pages/Store.jsx'
import Productpage from './pages/Productpage.jsx'
import Profile from './pages/Profile.jsx'
import Registerpage from './pages/Registerpage.jsx'
import Footer from './components/Footer.jsx'
import * as productService from './services/productService.js'
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom'


function App() {
  const [shuffleProducts, setShuffleProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
 

  const removeProduct = (id) => {
    const remainedProducts = cartProducts.filter((product)=>{
        return product.product.id != id;
    });

    setCartProducts(remainedProducts);
  }

  const addProduct = (product) => {
    console.log('app');
    let findProduct = shuffleProducts.filter((p)=>{
      return p.id === product.id;
    });

    let isProductInCart = cartProducts.filter((p)=>{
      return p.product.id === product.id;
    });

    if(isProductInCart.length > 0){
      setCartProducts((oldProducts)=>{
          const result = oldProducts.map((productset)=>{
              if(productset.product.id === product.id) {
                  const quantity = productset.quantity + product.quantity;
                  return {...productset, quantity: quantity}
              } 
              return productset;
          })
          return result;
      });
    } else {
      let findProductSet = {product: findProduct[0], quantity: product.quantity};
      setCartProducts((oldProducts)=>{
          return [...oldProducts, findProductSet];
      });
    }
  }

  const setQuantity = (id, newquantity) => {
    if(newquantity != 0) {
      setCartProducts((oldProducts)=>{
        const result = oldProducts.map((productset)=>{
            if(productset.product.id === id) {
                const quantity = (newquantity);
                return {...productset, quantity: quantity}
            } 
            return productset;
        })
        return result;
    });
    } else {
      removeProduct(id);
    }
  } 

  useEffect (()=>{
    productService.getAll()
      .then(result => setShuffleProducts(result.sort(() => Math.random() - 0.5)))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Header 
        products={shuffleProducts} 
        onClickRemoveFromCart={removeProduct} 
        cartProducts={cartProducts} 
        setQuantity={setQuantity}
      />
      <MainBackground />
      <Routes>
        <Route path='/' element={<Homepage products={shuffleProducts} onClickProduct={addProduct} />}/>
        <Route path='/about-us' element={<Homepage products={shuffleProducts} onClickProduct={addProduct} />} />
        <Route path='/contact-us' element={<Homepage products={shuffleProducts} onClickProduct={addProduct} />} />
        <Route path='/products' element={<Store products={shuffleProducts} onClickProduct={addProduct} />} />
        <Route path='/products/:id' element={<Productpage onClickProduct={addProduct}/>} />
        <Route path='/register' element={<Registerpage />} />
      </Routes>
      {/* <Profile /> */}
      
      
      
      <Footer />
    </div>
  )
}

export default App

