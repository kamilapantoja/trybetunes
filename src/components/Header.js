import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      carregandoCondicional: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({
      carregandoCondicional: true,
    });
    const userName = await getUser();
    this.setState({
      userName,
      carregandoCondicional: false,
    });
    console.log(userName);
  }

  render() {
    const { userName, carregandoCondicional } = this.state;
    return (
      <header data-testid="header-component">
        {carregandoCondicional === true ? (<Carregando />) : null}
        <span data-testid="header-user-name">{ userName.name }</span>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>

    );
  }
}

export default Header;
