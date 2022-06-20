import React, { Component } from 'react';

import './planet-details.css';
import SwapiService from "../../../services/swapi-service";
import Spinner from '../../spinner/spinner';

export default class PlanetDetails extends Component {

  swapiService = new SwapiService();

  state = {
    planet: null,
    loading: false
  };

  componentDidMount() {
    this.updatePlanet();
  }

  componentDidUpdate(prevProps) {
    if (this.props.planetId !== prevProps.planetId) {
      this.updatePlanet();
    }
  }

  updatePlanet() {
    const { planetId } = this.props;
    if (!planetId) {
      return;
    }
    this.setState({
      loading: true,
    })

    this.swapiService
      .getPlanet(planetId)
      .then((planet) => {
        this.setState({ planet,
          loading: false, });
      });
  }

  render() {

    const { planet } = this.state;


    if(this.state.loading) {
      return <div className="planet-details"> <Spinner /> </div>
    }

    if (!planet) {
      return <span>Select a person from a list</span>;
    }

    const { id, name, population,rotationPeriod, diameter } = planet;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
