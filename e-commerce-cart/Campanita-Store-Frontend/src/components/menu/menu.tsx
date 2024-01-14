// MenuIcon.tsx
import React from "react";
import "./menu.css";

interface MenuIconProps {
  selectedCategory: string | null;
  toggleDropdown: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ selectedCategory, toggleDropdown }) => (
  <div className="menu-icon" onClick={toggleDropdown}>
    <svg xmlns="http://www.w3.org/2000/svg" width="510" height="511" fill="none" viewBox="0 0 510 511">
      <path fill="white" fillRule="evenodd" d="M356 181H156V166H356V181zM356 256H156V241H356V256zM356.004 331H156.004V316H356.004V331z" clipRule="evenodd"></path>
    </svg>
    {selectedCategory && <span className="selected-category">{selectedCategory}</span>}
  </div>
);

export default MenuIcon;
