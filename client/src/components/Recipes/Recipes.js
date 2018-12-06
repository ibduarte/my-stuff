import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null // Empty recipes
    };
  }

  async componentDidMount() {
    // Fetch recipes from server
    const recipes = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      recipes // Update recipes with data fetched from server
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="page-title">Recipe Feed</h1>
        <hr />
        {/* Add new recipe card button */}
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3">
            <Link to="/create-recipe">
              <div className="card text-white light-blue mb-3">
                <div className="card-header">
                  <h3>+ New Recipe</h3>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Click here to add your own recipe!
                  </p>
                </div>
              </div>
            </Link>
          </div>
          {/* Display recipe data to card: */}
          {this.state.recipes &&
            this.state.recipes.map(recipe => (
              <div key={recipe.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/recipe/${recipe.id}`}>
                  <div className="card text-white mb-3 moonstone-blue">
                    <div className="card-header">
                      Comments: {recipe.comments}
                    </div>
                    <div className="card-body">
                      <h4 className="card-title recipes-title">
                        {recipe.title}
                      </h4>
                      <p className="card-text recipes-subtitle">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Recipes;