
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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 mt-[25px] max-[600px]:grid-cols-1">
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
