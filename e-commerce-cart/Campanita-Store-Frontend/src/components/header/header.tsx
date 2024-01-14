// Header.tsx
import React, {useState, ChangeEvent,} from 'react';
import { Link, useHistory} from 'react-router-dom';
import './header.css';

interface HeaderProps{
  onSelectedCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({onSelectedCategory}) => {
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const {value}  = e.target;
    setSelectedCategory(value);
    onSelectedCategory(value);

    history.push(`/products?category=${value}`);
  }

  return (
    <header className="header">
      <div className="header-content">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
          <Link to="/about">About Us</Link>
          
        </nav>

        <select
        className="category-dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="New-Arrival">New Arrival</option>
          <option value="What-Customer-Love">What Customer Love</option>
          <option value="Deal-of-Week">Deal Of Week</option>
          <option value="Shoes">Shoes</option>
          <option value="pants">Pants</option>
          <option value="Snikers">Snikers</option>
          <option value="t-shirt">T-Shirt</option>
          <option value="Shirt">Shirt</option>
          <option value="Shorts">Shorts</option>

        </select>


        <input type="text" className='search' placeholder='Search Products...' />
        <button type='submit'>Search</button>
      </div>
    </header>
  );
};

export default Header;
