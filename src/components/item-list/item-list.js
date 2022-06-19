import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  swapi = new SwapiService();

  constructor(props) {
    super(props);
  }

  state = {
    peopleList: [],
    loading: false,
  }

  componentDidMount() {
    this.swapi.getAllPeople()
    .then(peopleList => {
      this.setState({ 
        peopleList,
        loading: true,
      });
    });
  }


  render() {

    const {peopleList, loading} = this.state; 

    return (
      <ul className="item-list list-group">
        {!loading ? <Spinner /> : null}
        {peopleList ? peopleList.map(({id, name}) => {
          return (
            <li key={id} onClick={() => this.props.onItemSelected(id)} className="list-group-item">
              {name}
            </li>
          );
      }) : null}
      </ul>
    );
  }
}
