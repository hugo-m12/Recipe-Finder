import React from 'react';
import { useState } from "react";
import { Route } from "wouter"; 
import HomeView from "./views/Home";
import EditRecipeView from './views/EditRecipeView';
import CreateRecipeView from './views/CreateRecipeView';
import Error404View from './views/Error404View';
import RecipeDetail from './views/RecipeDetails';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';
import './App.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import storeService from './services/storeService';
import Footer from './components/Footer';
import RegisterView from './views/RegisterView';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(storeService.getToken() !== null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    storeService.deleteToken();
    setIsAuthenticated(false);
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Route exact path="/" component={HomeView} />
        <Route path="/Login" component={() => <LoginView onLogin={handleLogin} />} />
        <Route path="/Register" component={RegisterView} />
        <Toaster />
        <Route path="/404" component={Error404View} />
        <ConfirmProvider>
        <Route exact path="/AdminView" component={AdminView} />
        </ConfirmProvider>
        <Route path="/EditRecipe/:_id" component={EditRecipeView} />
        <Route path="/CreateRecipe" component={CreateRecipeView} />
        <Route path="/RecipeDetails/:_id" component={RecipeDetail} />
      <Footer />
    </>
  )
}

export default App
