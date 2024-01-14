// DropDown.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./dropDown.css"

interface DropDownProps {
  categories: string[];
  onCloseDropDown: () => void;
  className?: string; // Add className as an optional prop
}

const DropDown: React.FC<DropDownProps> = ({ categories, onCloseDropDown, className }) => (
  <div className="div-span-menu"><span className="span-menu">Menu</span>
  <div className={`dropdown ${className || ""}`}>
    
    <ul>
      {categories.map((category) => (
        <li key={category} onClick={onCloseDropDown} role="button">
          <Link to={`/by-category/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
    </div>
  </div>
);

export default DropDown;

