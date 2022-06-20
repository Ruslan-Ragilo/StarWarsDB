import React, { Component } from 'react';

import './starship-details.css';
import SwapiService from "../../../services/swapi-service";
import ErrorButton from "../../error-button/error-button";
import Spinner from '../../spinner/spinner';

export default class StarshipDetails extends Component {

  swapiService = new SwapiService();

  state = {
    starship: null,
    loading: false
  };

  componentDidMount() {
    this.updateStarship();
  }

  componentDidUpdate(prevProps) {
    if (this.props.starshipId !== prevProps.starshipId) {
      this.updateStarship();
    }
  }

  updateStarship() {
    const { starshipId } = this.props;
    if (!starshipId) {
      return;
    }
    this.setState({
      loading: true,
    })

    this.swapiService
      .getStarship(starshipId)
      .then((starship) => {
        this.setState({ starship,
          loading: false, });
      });
  }

  render() {

    const { starship } = this.state;


    if(this.state.loading) {
      return <div className="planet-details"> <Spinner /> </div>
    }

    if (!starship) {
      return <span>Select a person from a list</span>;
    }

    const { id, name } = starship;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
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
