import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const backendUrl=import.meta.env.VITE_BACKEND_URL;
export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Backend endpoint to get recipe by ID
        const response = await axios.get(`${backendUrl}/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch recipe details");
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container recipe-details">
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Back to Home
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <h2>Ingredients</h2>
      <ul
        className="ingredients"
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          marginBottom: "20px",
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {recipe.extendedIngredients?.map((ing, idx) => (
          <li key={idx}>{ing.original}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <div
        className="instructions"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          whiteSpace: "pre-wrap",
        }}
        dangerouslySetInnerHTML={{
          __html: recipe.instructions || "No instructions available.",
        }}
      ></div>
    </div>
  );
}