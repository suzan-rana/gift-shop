import React from 'react'
import { useSelector } from 'react-redux';
import { Navbar } from './components';

const App = () => {
  const products = useSelector( state => state.productStore)
  console.log(products)
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App;