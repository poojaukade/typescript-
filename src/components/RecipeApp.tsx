
import { useState } from "react";
import RecipeSearch from "./RecipeSearch";
import RecipeList from "./RecipeList";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import RecipeDetails from "./RecipeDetails";
import type { Recipe } from "./RecipeList";
import "./RecipeApp.css";



type MealDBResponse = {
  meals: Recipe[] | null;
};


function RecipeApp() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useLocalStorage(
    "recipe-search",
    ""
  );

  function handleSearch(value: string): void {
    setSearchTerm(value);
  }

  function handleViewDetails(recipeId: string): void {
    setSelectedRecipeId(recipeId);
  }

  function handleCloseDetails(): void {
    setSelectedRecipeId(null);
  }

  const url = searchTerm
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
    : "";

  const { data, loading, error } = useFetch<MealDBResponse>(url);

  
return (
  <section className="w-full mt-10 p-[30px] bg-white border border-[#e5e7eb] rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] max-[600px]:px-[15px] max-[600px]:py-5">
    <h2 className="m-0 mb-2 text-[#222222] text-[28px] text-center max-[600px]:text-[23px]">
      Recipe Finder
    </h2>

    <RecipeSearch
      onSearch={handleSearch}
      initialValue={searchTerm}
    />

    {loading && (
      <p className="my-5 text-center text-[15px] text-[#555555]">
        Loading recipes...
      </p>
    )}

    {error && (
      <p className="my-5 text-center text-[15px] text-[#dc2626]">
        Error: {error}
      </p>
    )}

    {selectedRecipeId ? (
      <RecipeDetails
        recipeId={selectedRecipeId}
        onClose={handleCloseDetails}
      />
    ) : (
      data?.meals && (
        <RecipeList
          recipes={data.meals}
          onViewDetails={handleViewDetails}
        />
      )
    )}

    {data && data.meals === null && (
      <p className="my-5 text-center text-[15px] text-[#777777]">
        No recipes found. Try another search.
      </p>
    )}
  </section>
);

}

export default RecipeApp;
