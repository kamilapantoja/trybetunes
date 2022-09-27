import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      saveSearch: '',
      isDisable: true,
      carregandoCondicional: false,
      isSearch: false,
      searchAlbuns: [],
      saveArtista: '',
    };
  }

  handleSearch = (event) => {
    const tamanhoNome = event.target.value.length;
    const minTamanho = 2;
    if (tamanhoNome >= minTamanho) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
    this.setState({
      saveSearch: event.target.value,
    });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { saveSearch } = this.state;
    this.setState({
      carregandoCondicional: true,
    });
    /* dessa linha pra cima o usuário ainda NÃO FOI CRIADO */
    const responseArtistaOuBanda = await searchAlbumsAPI(saveSearch);
    /* dessa linha pra baixo o usuário JA FOI CRIADO */
    this.setState({
      saveArtista: saveSearch,
      carregandoCondicional: false,
      saveSearch: '',
      searchAlbuns: responseArtistaOuBanda,
      isSearch: true,
    });
  }

  render() {
    const {
      carregandoCondicional,
      isDisable, saveSearch,
      saveArtista, searchAlbuns, isSearch } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">Search</div>
        {carregandoCondicional === true ? (<Carregando />) : null}
        <form>
          <label htmlFor="login-name-input">
            <h3>Pesquise uma banda ou artista</h3>
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleSearch }
              value={ saveSearch }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Pesquisa
          </button>
        </form>
        { searchAlbuns.length === 0 && isSearch === true ? (
          <span>Nenhum álbum foi encontrado</span>
        ) : null }
        {searchAlbuns.length > 0 ? (
          <>
            <h3>
              Resultado de álbuns de:
              {' '}
              { saveArtista }
            </h3>
            <ul>
              {searchAlbuns.map((albuns) => (
                <li key={ albuns.collectionId }>
                  <Link
                    to={ `/album/${albuns.collectionId}` }
                    data-testid={ `link-to-album-${albuns.collectionId}` }
                  >
                    <h2>{ albuns.collectionName }</h2>
                    <img src={ albuns.artworkUrl100 } alt={ albuns.collectionName } />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    );
  }
}

export default Search;
