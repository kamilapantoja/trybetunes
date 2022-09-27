import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      responseMusics: [],
    };
  }

  componentDidMount() {
    this.musics();
  }

  musics = async () => {
    const { match: { params: { id } } } = this.props;
    const responseMusics = await getMusics(id);
    this.setState({
      responseMusics,
    });
  }

  render() {
    const { responseMusics } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">Album</div>
        { responseMusics.length > 0 ? (
          <>
            <h3 data-testid="artist-name">{ responseMusics[0].artistName }</h3>
            <h4 data-testid="album-name">{ responseMusics[0].collectionName }</h4>

            <ul>
              {responseMusics.filter((musics) => musics.kind).map((musics) => (
                <li key={ musics.trackid }>
                  <MusicCard musicInfo={ musics } />
                </li>
              ))}
            </ul>
          </>
        ) : null}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
