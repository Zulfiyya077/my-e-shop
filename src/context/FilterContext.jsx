import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key, defaultValue) => searchParams.get(key) || defaultValue;

  const [category, setCategoryState] = useState(getParam("category", "all"));
  const [brand, setBrandState] = useState(getParam("brand", "all"));
  const [color, setColorState] = useState(getParam("color", "all"));
  const [minPrice, setMinPrice] = useState(Number(getParam("minPrice", 0)));
  const [maxPrice, setMaxPrice] = useState(Number(getParam("maxPrice", 5000)));
  const [rating, setRatingState] = useState(Number(getParam("rating", 0)));
  const [sortBy, setSortByState] = useState(getParam("sortBy", "default"));
  const [page, setPageState] = useState(Number(getParam("page", 1)));

  const isInitialSync = useRef(true);

  useEffect(() => {
    if (isInitialSync.current) {
      isInitialSync.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (category !== "all") params.set("category", category); else params.delete("category");
    if (brand !== "all") params.set("brand", brand); else params.delete("brand");
    if (color !== "all") params.set("color", color); else params.delete("color");
    if (minPrice > 0) params.set("minPrice", minPrice); else params.delete("minPrice");
    if (maxPrice < 5000) params.set("maxPrice", maxPrice); else params.delete("maxPrice");
    if (rating > 0) params.set("rating", rating); else params.delete("rating");
    if (sortBy !== "default") params.set("sortBy", sortBy); else params.delete("sortBy");
    if (page > 1) params.set("page", page); else params.delete("page");

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [category, brand, color, minPrice, maxPrice, rating, sortBy, page]);


  useEffect(() => {
    const urlCategory = getParam("category", "all");
    const urlBrand = getParam("brand", "all");
    const urlColor = getParam("color", "all");
    const urlMin = Number(getParam("minPrice", 0));
    const urlMax = Number(getParam("maxPrice", 5000));
    const urlRating = Number(getParam("rating", 0));
    const urlSort = getParam("sortBy", "default");
    const urlPage = Number(getParam("page", 1));

    if (urlCategory !== category) setCategoryState(urlCategory);
    if (urlBrand !== brand) setBrandState(urlBrand);
    if (urlColor !== color) setColorState(urlColor);
    if (urlMin !== minPrice) setMinPrice(urlMin);
    if (urlMax !== maxPrice) setMaxPrice(urlMax);
    if (urlRating !== rating) setRatingState(urlRating);
    if (urlSort !== sortBy) setSortByState(urlSort);
    if (urlPage !== page) setPageState(urlPage);
  }, [searchParams]);

  const setPriceRange = useCallback(([min, max]) => {
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  const resetAllFilters = useCallback(() => {
    setCategoryState("all");
    setBrandState("all");
    setColorState("all");
    setMinPrice(0);
    setMaxPrice(5000);
    setRatingState(0);
    setSortByState("default");
    setPageState(1);

    // Explicitly clear URL params
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return (
    <FilterContext.Provider
      value={{
        category,
        setCategory: setCategoryState,
        brand,
        setBrand: setBrandState,
        color,
        setColor: setColorState,
        priceRange: [minPrice, maxPrice],
        setPriceRange,
        rating,
        setRating: setRatingState,
        sortBy,
        setSortBy: setSortByState,
        page,
        setPage: setPageState,
        resetAllFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);