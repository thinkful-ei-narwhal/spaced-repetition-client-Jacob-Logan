import React from 'react'
import languageService from '../services/languageService'


const LanguageContext = React.createContext({
  language: {},
  words: [],
  getLanguage: () => { },
  getCurrentWord: () => {}

})

export default LanguageContext;

export class LanguageProvider extends React.Component {

  state = {
    language: {},
    words: [],
    currentWord: '',
    isRight: null
  }

  getLanguage = () => {
    console.log('test')
    languageService.getLanguages()
      .then((data) => this.setState({ language: data.language, words: data.words }))
  }

  getCurrentWord = () => {
    languageService.getCurrentWord()
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      getLanguage: this.getLanguage,
      getCurrentWord: this.getCurrentWord
    };

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>

    )
  }
}

