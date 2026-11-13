
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
    <section className="recipe-app">
      <h2>Recipe Finder</h2>

      <RecipeSearch
        onSearch={handleSearch}
        initialValue={searchTerm}
      />

      {loading && (
        <p className="recipe-message recipe-loading">
          Loading recipes...
        </p>
      )}

      {error && (
        <p className="recipe-message recipe-error">
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
        <p className="recipe-message recipe-empty">
          No recipes found. Try another search.
        </p>
      )}
    </section>
  );
}

export default RecipeApp;
