import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProducByCategory } from "./components/products/productByCategory";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import {ProductList} from "./components/products/productList";
import {Signup} from "./components/signup/signup";
import {Login} from "./components/login/login";
import AddProductForm from "./components/addProducts/addProduct";
import { HomePage } from "./components/home/homePage";
import "./App.css";

const App: React.FC = () => {
  const handleCategorySelection = (category: string) => {
    // You can perform any actions based on the selected category here
    console.log('Selected Category:', category);
    
  };

  return (
    <Router>
      <Header onSelectedCategory={handleCategorySelection} />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} /> 
        <Route path="/by-category/:categoryId" component={ProducByCategory} />
       <Route path="products" component={ProductList} />
        <Route path="/add-product" component={() => <AddProductForm onAddProduct={handleAddProduct} />} />
        <Route path="/" component={HomePage}></Route>
       
        {/* Add more routes as needed */}
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;



        
