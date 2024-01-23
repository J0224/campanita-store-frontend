// homePage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './homePage.css';
import { ProductList, Product } from '../products/productList';

import image1 from "../../assets//campanita store new logo.png";
import image2 from "../../assets/ecommerce-a.jpg";
import image3 from "../../assets/ecommerce.jpg";
import image4 from "../../assets/ecommerce-buy.jpg";
import image5 from "../../assets/ecomerce-df.jpg";
import image6 from "../../assets/ecomerce-v.jpg";


const homePageMessages = [
  'Discover Timeless Elegance and Contemporary Style at Campanita Store.',
  'Empower your personal style with our curated collection for men.',
  'Quality meets authenticity at Campanita Store – where fashion speaks.',
  'Explore the intersection of modern, classical, and occasional clothing.',
  'Step into a world of sophistication and express your unique identity at Campanita Store.',
  'Discover a fusion of elegance and comfort in our diverse range of contemporary clothing.'
];

const imageUrls = [
  image1,
  image2,
  image3,
  image4,
  image5, 
  image6,
];



export const HomePage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrls[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % homePageMessages.length);
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        console.log('GET request response:', response.data);
      } catch (error) {
        console.error('GET request error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    setCurrentImageUrl(imageUrls[currentMessageIndex]);
  }, [currentMessageIndex]);

  const handleSelectProduct = (product: Product) => {
    console.log('Selected product:', product);
  };

  return (
    <section>
      <div id="homePage" className="home" title="home-page">
        <h1>Welcome to Campanita Store</h1>
        <div className="cross-picture">
        <p>{homePageMessages[currentMessageIndex]}</p>
          <img src={currentImageUrl} alt="Cross" />
          <div className="cross-line" />
        </div>
        <ProductList onSelectProduct={handleSelectProduct} />
      </div>
    </section>
  );
};