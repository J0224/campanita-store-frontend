// Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Campanita Store. All rights reserved.</p>
        {/* Add more information or links as needed */}
        <div className="footer-links">
          <Link to="/admin-signup">Admin Signup</Link>
          <Link to="/add-product">Add Product</Link>
          <Link to="/update-product/:productId">Update Product</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
