import config from '../config'
import TokenService from './token-service'

const languageService = {
  getLanguages() {
    return fetch(`${config.API_ENDPOINT}/language`,
      {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
      .then((res) => res.json())

      .catch((error) => console.log(error))
  },

  getCurrentWord() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
  },

  submitGuess(binary, id) {
    console.log('binary', binary, 'id', id)
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      //id is the id of the word being tested on
      body: JSON.stringify({ binary: binary, id: id})
    })
    .then(res => res.json())
  }
}

export default languageService;