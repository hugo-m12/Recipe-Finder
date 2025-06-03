import PropTypes from "prop-types";
import './RecipeCard.css';

function RecipeCard({ recipes }) {

    RecipeCard.propTypes = {
        recipes: PropTypes.object,
      };

  return (
    <div className="recipecard hover:z-10" key={recipes._id}>
      <div className="card-details">
        <p className="font-[Signika_Negative] text-title">{recipes.name}</p>
        <p>{recipes.mealType}</p>
        <p>{recipes.difficulty}</p>
        <img src={recipes.thumbnail} alt="Loading..."/>
      </div>
      <button className="recipecard-button">More info</button>
    </div>
  );
}

export default RecipeCard;
