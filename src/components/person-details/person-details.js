import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  swapi = new SwapiService();

  state = {
    person: null,
    loading: null,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.updatePerson(this.props.idSelectedPerson);
  }


  componentDidUpdate(prevProps) {
    if(prevProps.idSelectedPerson !== this.props.idSelectedPerson) {
      this.updatePerson(this.props.idSelectedPerson);
    }
  }

  updatePerson() {
    const {idSelectedPerson} = this.props;
    if(!idSelectedPerson) {
      return;
    }
    this.setState({
      loading: true
    })
    this.swapi.getPerson(idSelectedPerson)
    .then(person => {
      this.setState({
        person,
        loading: false,
      })
    })
  }

  render() {

    if(this.state.loading) {
      return <div className="person-details card"> <Spinner /> </div>
    }

    if(!this.state.person) {
      return <span>Select a person from a list</span>
    }

    const {id, name, gender, birthYear, eyeColor} = this.state.person;

    

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}