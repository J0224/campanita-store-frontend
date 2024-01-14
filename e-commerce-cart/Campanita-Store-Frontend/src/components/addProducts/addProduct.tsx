import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import "./addProductForm.css"

interface AddProductFormProps {
  onAddProduct: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    colors: "",
    sizes: "",
    quantity: 0,
    sku: "",
    image: null as File | null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setProductData((prevData) => ({ ...prevData, image: file }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProductData((prevData) => ({ ...prevData, category: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          category: productData.category,
        },
      });
      onAddProduct();

      setProductData({
        name: "",
        category: "",
        description: "",
        price: 0,
        colors: "",
        sizes: "",
        quantity: 0,
        sku: "",
        image: null,
      });

      setMessage(
        {
          text: "Product has been added successfully", type: "success"
        }
      );
      console.log('formData:', formData);
      console.log('Response from server:', response);
      setTimeout(() => setMessage(null), 1000);
      return;

    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  return (
    <div className='add-product-div'>
      <div className="message-div">
        {message && <div className={`message ${message.type === "success" ? "success" : "error"}`}> {message.text} </div>}
      </div>

      <form id="AddProduct" className="add-product-form" onSubmit={handleSubmit}>

        <label>
          Name:
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
        </label>

        <label>
          Category:
          <select name="category" value={productData.category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="pants">Pants</option>
            <option value="t-shirt">T-Shirt</option>
            <option value="Shorts">Shorts</option>
            <option value="Shirt">Shirt</option>
            <option value="Shoes">Shoes</option>
            <option value="Snikers">Snikers</option>
            <option value="New-Arrival">New Arrival</option>
            <option value="Deal-of-Week">Deal of Week</option>
            <option value="What-Customer-Love">What Customer Love</option>
          </select>
        </label>

        <label>
          Description:
          <input type="text" name="description" value={productData.description} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={productData.quantity} onChange={handleInputChange} />
        </label>

        <label>
          Colors (comma-separated):
          <input type="text" name="colors" value={productData.colors} onChange={handleInputChange} />
        </label>

        <label>
          Sizes (comma-separated):
          <input type="text" name="sizes" value={productData.sizes} onChange={handleInputChange} />
        </label>

        <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
          {productData.image && (
            <img src={URL.createObjectURL(productData.image)} alt="Product Preview" className="image-preview" />
          )}
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
