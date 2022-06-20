import React, { Component } from 'react';

import './planet-details.css';
import SwapiService from "../../../services/swapi-service";
import ErrorButton from "../../error-button/error-button";
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

    const { id, name } = planet;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              {/* <span>{gender}</span> */}
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              {/* <span>{birthYear}</span> */}
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              {/* <span>{eyeColor}</span> */}
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
