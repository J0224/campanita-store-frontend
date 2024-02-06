// MenuIcon.tsx
import React, { useState } from "react";
import DropDown from "../dropDown/dropDownMenu";
import "./menu.css";
import DropdownIcon from "../../assets/bars-solid.svg";

interface MenuIconProps {
  selectedCategory: string | null;
  categories: string[];
  toggleDropdown: () => void;
  onSelectedCategory: (category: string) => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  selectedCategory,
  categories,
  onSelectedCategory,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropDownClick = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="menu-icon" onClick={handleDropDownClick}>
      <DropDown
        categories={categories}
        onCloseDropDown={() => setShowDropDown(false)}
        onCategorySelect={(category) => {
          onSelectedCategory(category);
          setShowDropDown(false);
        }}
        className={`dropdown ${showDropDown ? "active left" : ""}`}
      />
      <img src={DropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
      {selectedCategory && (
        <span className="selected-category">{selectedCategory}</span>
      )}
    </div>
  );
};

export default MenuIcon;
