// Header.tsx
import React, { useState, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './header.css';
import MenuIcon from "../menu/menu"

interface HeaderProps {
  onSelectedCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectedCategory }) => {
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedCategory(value);
    onSelectedCategory(value);

    if (value) {
      // Navigate to the selected category page
      history.push(`/by-category/${value}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <MenuIcon
          selectedCategory={selectedCategory}
          categories={['New-Arrival', 'What-Customer-Love', 'Deal-of-Week', 'Shoes', 'pants', 'Snikers', 't-shirt', 'Shirt', 'Shorts']}
          toggleDropdown={() => {}}
        />

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
          <Link to="/about">About Us</Link>
        </nav>

        <input type="text" className="search" placeholder="Search Products..." />
        <button type="submit">Search</button>
      </div>
    </header>
  );
};

export default Header;
