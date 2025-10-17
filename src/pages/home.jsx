import { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/recipeCard";
const backendUrl=import.meta.env.VITE_BACKEND_URL;
//hii

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ingredients) return;
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/recipes`, {
        params: { ingredients },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 style={{textAlign:"center", marginBottom:"20px"}}>Smart Recipe Generator</h1>
      <div className="input-group">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p style={{textAlign:"center"}}>Loading recipes...</p>}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}