import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      saveInput: '',
      isDisable: true,
      carregandoCondicional: false,
    };
  }

  /* Todo onChange, onClick que utilizamos recebe um event como parâmetro
  o event referencia os onChange da vida
  e o target referencia a tag onde on OnChange está */
  handleInputUser = (event) => {
    const tamanhoNome = event.target.value.length;
    const minTamanho = 3;
    if (tamanhoNome >= minTamanho) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
    this.setState({
      saveInput: event.target.value,
    });
  }

  /* o event.preventDefault evita que minha página recarregue quando eu clicar no botão de submit */
  handleClick = async (event) => {
    event.preventDefault();
    const { saveInput } = this.state;
    this.setState({
      carregandoCondicional: true,
    });
    /* dessa linha pra cima o usuário ainda NÃO FOI CRIADO */
    await createUser({ name: saveInput });
    /* dessa linha pra baixo o usuário JA FOI CRIADO */
    this.setState({
      carregandoCondicional: false,
    });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { carregandoCondicional, isDisable } = this.state;
    return (
      <div data-testid="page-login">
        Login
        {carregandoCondicional === true ? (<Carregando />) : null}
        <form>
          <label htmlFor="login-name-input">
            <h3>Nome</h3>
            <input
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleInputUser }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

/* O "history" por si só é um objeto, por usa-se o proptypes.shape
dentro da shape, na linha de baixo, indicamos o que estamos usando e qual o
tipo dela.  */

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
