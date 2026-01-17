import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [color, setColor] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [rating, setRating] = useState(0);

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        category,
        setCategory,
        brand,
        setBrand,
        color,
        setColor,
        priceRange,
        setPriceRange,
        rating,
        setRating,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
