import React, { Component, useReducer } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import languageService from '../../services/languageService';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
export default class Dashboard extends Component {
  static contextType = LanguageContext;

  componentDidMount() {
    this.context.getLanguage()

  }

  render() {
    console.log(this.context)
    return (
      <div>
        <h1>Learn {this.context.language.name}</h1>
        <h3>Total score for {this.context.language.name}: {this.context.language.total_score}</h3>
        <Link to='/learn'>
          <Button>
            Start Practice
        </Button>
        </Link>
        <div>
          <h3>Words to practice</h3>
          <ul>
            {this.context.words.map(word =>
              <li key={word.id}>
                <p>word: {word.original}</p>
                <p>Times correct: {word.correct_count}</p>
                <p>Times incorrect: {word.incorrect_count}</p>
              </li>)}
          </ul>
        </div>
      </div>
    )
  }
}