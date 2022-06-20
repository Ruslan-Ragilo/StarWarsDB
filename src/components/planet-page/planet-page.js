import React, { Component } from 'react'
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator/';
import ItemList from '../item-list';
import PlanetDetails from './planet-details/planet-details';

export default class PlanetPage extends Component {

swapiService = new SwapiService();

state = {
  selectedPlanet: null,
  hasError: false,
};

componentDidCatch(error, info) {

  this.setState({
    hasError: true
  });
}

onPlanetSelected = (selectedPlanet) => {
  this.setState({ selectedPlanet });
};

render() {


  if (this.state.hasError) {
    return <ErrorIndicator />;
  }
    return (
      <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPlanetSelected}
              getData={this.swapiService.getAllPlanets} />
          </div>
          <div className="col-md-6">
            <PlanetDetails planetId={this.state.selectedPlanet} />
          </div>
        </div>

    )
  }
}
