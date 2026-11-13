
import useFetch from "../hooks/useFetch";

type MealDBDetailResponse = {
  meals: RecipeDetail[] | null;
};


// Recipe details type
type RecipeDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | null;
};

// Component props
type RecipeDetailsProps = {
  recipeId: string;
  onClose: () => void;
};

// Ingredient type
type Ingredient = {
  name: string | null;
  measure: string | null;
};

function RecipeDetails({ recipeId, onClose }: RecipeDetailsProps) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  const { data, loading, error } = useFetch<MealDBDetailResponse>(url);
  console.log("meals+++++", data?.meals);

  const recipe: RecipeDetail | undefined = data?.meals?.[0];

  if (loading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!recipe) {
    return <p>Recipe details not found.</p>;
  }

  const ingredients: Ingredient[] = Array.from(
    { length: 20 },
    (_, index) => {
      const number = index + 1;

      return {
        name: recipe[`strIngredient${number}`],
        measure: recipe[`strMeasure${number}`],
      };
    }
  ).filter((item) => item.name?.trim());

 return (
    <div className="mt-[25px] p-[25px] border border-[#eeeeee] rounded-xl bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] max-[600px]:p-4">

      <button
        type="button"
        className="px-4 py-[10px] border-0 rounded-md bg-[#e47745] text-white text-sm cursor-pointer transition-colors duration-200 hover:bg-[#c85e30]"
        onClick={onClose}
      >
        Back to Recipes
      </button>

      <h2 className="my-[22px] text-[#292929] text-[26px] max-[600px]:text-[22px]">
        {recipe.strMeal}
      </h2>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="block w-full h-[280px] object-cover rounded-[10px] mb-5 max-[600px]:h-[220px]"
      />

      <p className="my-[10px] text-[#555555] leading-[1.7]">
        <strong>Category:</strong> {recipe.strCategory}
      </p>

      <p className="my-[10px] text-[#555555] leading-[1.7]">
        <strong>Cuisine:</strong> {recipe.strArea}
      </p>

      <h3 className="mt-[25px] mb-3 text-[#292929] text-xl">
        Ingredients
      </h3>

      <ul className="pl-[22px]">
        {ingredients.map((item, index) => (
          <li
            key={index}
            className="mb-[10px] px-3 py-2 rounded-md bg-[#fff5ef] text-[#555555] leading-[1.5]"
          >
            {item.measure} {item.name}
          </li>
        ))}
      </ul>

      <h3 className="mt-[25px] mb-3 text-[#292929] text-xl">
        Cooking Instructions
      </h3>

      <p className="text-[#555555] leading-[1.8] whitespace-pre-line">
        {recipe.strInstructions}
      </p>

    </div>
  );
}

export default RecipeDetails;
