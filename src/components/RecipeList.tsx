
import RecipeCard from "./RecipeCard";

// Define the recipe properties used by this component

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string | null;
  strArea: string | null;
};


// Define component props
type RecipeListProps = {
  recipes: Recipe[];
  onViewDetails: (recipeId: string) => void;
};

function RecipeList({ recipes, onViewDetails }: RecipeListProps) {
  return (
    <div className="recipe-results">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

export default RecipeList;
