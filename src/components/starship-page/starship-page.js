import React, { Component } from 'react'
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import StarshipDetails from './starship-details/starship-details';

export default class StarshipPage extends Component {

  swapiService = new SwapiService();
  
  state = {
    selectedStarship: null,
    hasError: false,
  };

  componentDidCatch(error, info) {

    this.setState({
      hasError: true
    });
  }

  onStarshipSelected = (selectedStarship) => {
    this.setState({ selectedStarship });
  };

  render() {


    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    return (
      <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onStarshipSelected}
              getData={this.swapiService.getAllStarships} />
          </div>
          <div className="col-md-6">
            <StarshipDetails starshipId={this.state.selectedStarship} />
          </div>
        </div>
    )
  }
}
