import React from "react";
import { Link } from "react-router-dom";
import "./dropDown.css";

interface DropDownProps {
  categories: string[];
  onCloseDropDown: () => void;
  onCategorySelect: (category: string) => void;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  categories,
  onCategorySelect,
  className,
}) => (
  <div className="div-span-menu">
    <span className="span-menu">Menu</span>
    <div className={`dropdown ${className || ""}`}>
      <ul>
        <li>
          <Link
            to={"/products"}
            onClick={() => onCategorySelect("All-Category")}
          >
            All-Category
          </Link>
        </li>
        {/* Specific category links */}
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/by-category/${category}`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default DropDown;
