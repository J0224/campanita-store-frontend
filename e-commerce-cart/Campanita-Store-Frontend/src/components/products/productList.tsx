// productList.tsx
import React, { useEffect, useState } from "react";
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

interface ProductListProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onSelectProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    quantity: number;
    color: string | null;
    size: string | null;
  }>({
    quantity: 1,
    color: null,
    size: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async () => {
    if (selectedProduct) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/cart/add-product",
          {
            product: {
              _id: selectedProduct._id,
              name: selectedProduct.name,
              price: selectedProduct.price,
              category: selectedProduct.category,
            },
            quantity: selectedOptions.quantity,
            color: selectedOptions.color,
            size: selectedOptions.size,
          }
        );

        setCart(response.data.items);
        console.log("Product added successfully to cart:", response.data.items);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  const handleOptionChange = (optionType: string, value: string | number) => {
    setSelectedOptions({ ...selectedOptions, [optionType]: value });
  };

  return (
    <div className="product-list-div">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="product-list-ul">
        {products.map((product: Product) => (
          <li className="product-li" key={product._id.toString()}>
            {product.image && (
              <div onClick={() => setSelectedProduct(product)}>
                <img
                  src={product.image.filePath}
                  alt={product.name}
                  className="product-img"
                />
              </div>
            )}

            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-price">
                <span>Price: US$</span> {product.price}
              </div>

              {selectedProduct && selectedProduct._id === product._id && (
                <>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      value={selectedOptions.quantity}
                      onChange={(e) =>
                        handleOptionChange("quantity", Number(e.target.value))
                      }
                    />
                  </label>

                  <label>
                    Color:
                    <select
                      value={selectedOptions.color || ""}
                      onChange={(e) =>
                        handleOptionChange("color", e.target.value)
                      }
                    >
                      <option value="">Select Color</option>
                      {product.color.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Size:
                    <select
                      value={selectedOptions.size || ""}
                      onChange={(e) =>
                        handleOptionChange("size", e.target.value)
                      }
                    >
                      <option value="">Select Size</option>
                      {product.size.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button onClick={addToCart}>Add to Cart</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
