import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
      carregandoCondicional: false,
    };
  }

  componentDidMount() {
    this.listFavoriteMusic();
  }

  verifyFavorite = async ({ target }) => {
    const { musicInfo } = this.props;
    if (target.checked) {
      this.setState({
        carregandoCondicional: true,
        isChecked: true,
      });
      await addSong(musicInfo);
      this.setState({
        carregandoCondicional: false,
      });
    } else { /* coloquei esse else aqui senão o checkbox ia ficar marcado forever and ever */
      this.setState({
        isChecked: false,
      });
    }
  }

  listFavoriteMusic = () => {
    const { musicInfo } = this.props;
    this.setState({
      carregandoCondicional: true,
    });
    getFavoriteSongs()
      .then((response) => this.setState({
        isChecked: response.some(({ trackId }) => trackId === musicInfo.trackId),
        carregandoCondicional: false,
      }));
  }

  render() {
    const { musicInfo } = this.props;
    const { carregandoCondicional, isChecked } = this.state;
    return (
      <>
        <h3>{ musicInfo.trackName }</h3>
        <audio data-testid="audio-component" src={ musicInfo.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {carregandoCondicional === true ? (<Carregando />) : null}
        <label htmlFor="favorita">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${musicInfo.trackId}` }
            onChange={ this.verifyFavorite }
            checked={ isChecked }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = { musicInfo: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default MusicCard;
