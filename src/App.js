import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";
import axios from 'axios'

class App extends Component {
  state = {
    recipes: [],
    error: '',
    loading: false
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    this.setState({ loading: true })
    try {

      const response = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`)
      // const api_call = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);

      // const data = await api_call.json();
      if (response.status === 200)
        this.setState({ recipes: response.data.recipes, error: '', loading: false });
    }
    catch (e) {
      console.log('Errror', e.message)
      this.setState({ error: 'No data found for given recipie', recipes: [], loading: false })
    }
    // console.log(this.state.recipes);
  }
  // componentDidMount = () => {
  //   const json = localStorage.getItem("recipes");
  //   const recipes = JSON.parse(json);
  //   this.setState({ recipes });
  // }
  // componentDidUpdate = () => {
  //   const recipes = JSON.stringify(this.state.recipes);
  //   localStorage.setItem("recipes", recipes);
  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        {this.state.loading ? 'Loding...' :
          <Recipes recipes={this.state.recipes} error={this.state.error} />
        }
      </div>
    );
  }
}

export default App;