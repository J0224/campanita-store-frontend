import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductList } from "./components/products/productList";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import "./App.css"


const App: React.FC = () => {
  

  return (

   

    
    <Router>
      
           <Header/>
           <ProductList onSelectProduct={(product) => console.log(product)} />  
       
       <Footer/>
    </Router>
    
  );
};

export default App;
