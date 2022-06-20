import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';

import './app.css';
import SwapiService from "../../services/swapi-service";
import PlanetPage from '../planet-page/planet-page';
import StarshipPage from '../starship-page/starship-page';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <BrowserRouter>
        <div className="stardb-app">
          <Header />
          { planet }

          <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <ErrorButton />
          </div>
          
            <Routes>
                <Route path="/" element={<PeoplePage />} />
                
                <Route path="/planet-page>" element={<PlanetPage />} />
                <Route path="/starship-page" element={<StarshipPage />} />
            </Routes>
        
        </div>
      </BrowserRouter>
    );
  }
}
