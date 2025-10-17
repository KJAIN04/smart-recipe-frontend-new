import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <button onClick={() => navigate(`/recipe/${recipe.id}`)}>View Recipe</button>
    </div>
  );
}
