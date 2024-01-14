// homePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './homePage.css';
import { ProductList, Product } from '../products/productList';

const homePageMessages = [
  'Discover Timeless Elegance and Contemporary Style at Campanita Store.',
  'Empower your personal style with our curated collection for men.',
  'Quality meets authenticity at Campanita Store – where fashion speaks.',
  'Explore the intersection of modern, classical, and occasional clothing.',
];

export const HomePage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % homePageMessages.length);
    }, 5000); // change time in milliseconds, meaning 10 seconds

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

  const handleSelectProduct = (product: Product) => {
    // Handle product selection logic here
    console.log('Selected product:', product);
  };

  return (
    <section>
      <div id="homePage" className="home" title="home-page">
        <h1>Welcome to Campanita Store</h1>
        <p>{homePageMessages[currentMessageIndex]}</p>

        <ProductList onSelectProduct={handleSelectProduct} />
      </div>
    </section>
  );
};
