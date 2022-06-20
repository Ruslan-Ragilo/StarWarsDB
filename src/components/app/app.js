import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';

import './app.css';
import SwapiService from "../../services/swapi-service";
import PlanetPage from '../planet-page/planet-page';
import StarshipPage from '../starship-page/starship-page';
import PeoplePage from '../people-page/people-page';
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
            <Routes>
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/planet" element={<PlanetPage />} />
                <Route path="/starship" element={<StarshipPage />} />
            </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
