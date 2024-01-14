import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import mongoose from "mongoose";
import "./productList.css";

interface Product {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  color: string[];
  size: string[];
  sku: string;
  image: { filePath: string };
  _id: mongoose.Types.ObjectId;
}

interface CartItem {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
  total: number;
}

interface ProducByCategoryProps {
  onSelectProduct: (product: Product) => void;
}

export const ProducByCategory: React.FC<ProducByCategoryProps> = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/by-category?category=${categoryId}`);
        setProducts(response.data);
        console.log('Selected category ID:', categoryId);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    }
  }, [categoryId]);

  const addToCart = async (product: Product) => {
    try {
      const response = await axios.post("http://localhost:8000/api/cart/add-product", {
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
        },
        quantity: 1,
      });

      // Handle the cart state as needed
      console.log("Product added successfully to cart:", response.data.items);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="product-list-div-by-category">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="product-list-ul-by-category">
        {products.map((product: Product) => (
          <li className="product-li-by-category" key={product._id.toString()}>
            {product.image && (
              <img src={product.image.filePath} alt={product.name} className="product-img-by-category" />
            )}

            <div className="product-details-by-category">
              <div className="product-name-by-category">{product.name}</div>
              <div className="product-desc-by-category">{product.description}</div>
              <div className="product-price-by-category">
                <span>Price: US$</span> {product.price}
              </div>
              <div className="product-color-by-category">
                <span>Color</span> {product.color}
              </div>
              <div className="product-size-by-category">
                <span>Size</span> {product.size}
              </div>
              <div className="product-sku-by-category">
                <span>SKU</span> {product.sku}
              </div>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <Link to={`/by-category/${product.category}`}>
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
