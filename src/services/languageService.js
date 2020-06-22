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
  }
}

export default languageService;