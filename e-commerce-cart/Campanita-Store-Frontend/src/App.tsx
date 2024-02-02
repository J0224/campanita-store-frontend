import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ProducByCategory } from "./components/products/productByCategory";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { ProductList } from "./components/products/productList";
import { Signup } from "./components/signup/signup";
import { Login } from "./components/login/login";
import AddProductForm from "./components/addProducts/addProduct";
import { HomePage } from "./components/home/homePage";
import { ForgotPassword } from "./components/forgotPassword/forgotPassword";
import { ResetPassword } from "./components/resetPassword/resetPassword";
import "./App.css";

const App: React.FC = () => {
  const handleCategorySelection = (category: string) => {
    console.log("Selected Category:", category);
  };

  // Scroll to top on route change
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <Header onSelectedCategory={handleCategorySelection} />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/resetpassword/:resetToken" component={ResetPassword} />
        <Route path="/by-category/:categoryId" component={ProducByCategory} />
        <Route path="products" component={ProductList} />
        <Route
          path="/add-product"
          component={() => <AddProductForm onAddProduct={() => {}} />}
        />

        <Route path="/" component={HomePage}></Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
