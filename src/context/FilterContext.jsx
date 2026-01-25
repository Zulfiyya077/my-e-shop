import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key, defaultValue) => searchParams.get(key) || defaultValue;
  const getArrayParam = (key) => {
    const val = searchParams.get(key);
    return val ? val.split(",") : [];
  };

  const [category, setCategoryState] = useState(getParam("category", "all"));
  const [brand, setBrandState] = useState(getArrayParam("brand"));
  const [color, setColorState] = useState(getArrayParam("color"));
  const [minPrice, setMinPrice] = useState(Number(getParam("minPrice", 0)));
  const [maxPrice, setMaxPrice] = useState(Number(getParam("maxPrice", 5000)));
  const [rating, setRatingState] = useState(Number(getParam("rating", 0)));
  const [sortBy, setSortByState] = useState(getParam("sortBy", "default"));
  const [page, setPageState] = useState(Number(getParam("page", 1)));

  const isInitialSync = useRef(true);

  // Effect to sync State -> URL
  useEffect(() => {
    if (isInitialSync.current) {
      isInitialSync.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (category !== "all") params.set("category", category); else params.delete("category");
    if (brand.length > 0) params.set("brand", brand.join(",")); else params.delete("brand");
    if (color.length > 0) params.set("color", color.join(",")); else params.delete("color");
    if (minPrice > 0) params.set("minPrice", minPrice); else params.delete("minPrice");
    if (maxPrice < 5000) params.set("maxPrice", maxPrice); else params.delete("maxPrice");
    if (rating > 0) params.set("rating", rating); else params.delete("rating");
    if (sortBy !== "default") params.set("sortBy", sortBy); else params.delete("sortBy");
    if (page > 1) params.set("page", page); else params.delete("page");

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [category, brand.join(","), color.join(","), minPrice, maxPrice, rating, sortBy, page]);


  // Effect to sync URL -> State (e.g., on Back/Forward)
  useEffect(() => {
    const urlCategory = getParam("category", "all");
    const urlBrand = getArrayParam("brand");
    const urlColor = getArrayParam("color");
    const urlMin = Number(getParam("minPrice", 0));
    const urlMax = Number(getParam("maxPrice", 5000));
    const urlRating = Number(getParam("rating", 0));
    const urlSort = getParam("sortBy", "default");
    const urlPage = Number(getParam("page", 1));

    if (urlCategory !== category) setCategoryState(urlCategory);
    if (JSON.stringify(urlBrand) !== JSON.stringify(brand)) setBrandState(urlBrand);
    if (JSON.stringify(urlColor) !== JSON.stringify(color)) setColorState(urlColor);
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
    setBrandState([]);
    setColorState([]);
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