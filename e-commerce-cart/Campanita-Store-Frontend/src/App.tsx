import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
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
import { useAuth } from "./components/auth/authProvider";
import ScrollToTop from "./components/scrollToTop";

const App: React.FC = () => {
  const { logout, lastActivity } = useAuth();
  const history = useHistory();

  // Logout user after 30 minutes of inactivity
  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      const currentTime = Date.now();
      const inactivityDuration = currentTime - lastActivity;

      // Redirect to login page after logout
      history.push("/login");

      if (inactivityDuration >= 30 * 60 * 1000) {
        logout();
      }
    }, 30 * 60 * 1000);

    // Clear the timeout on component unmount or when lastActivity changes
    return () => {
      clearTimeout(inactivityTimeout);
    };
  }, [lastActivity, logout]);

  const handleCategorySelection = (category: string) => {
    
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
        <Route path="/products" component={ProductList} />
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
