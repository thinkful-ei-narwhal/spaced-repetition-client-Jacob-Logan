import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'

import { Link } from 'react-router-dom';
import './Dashboard.css'
export default class Dashboard extends Component {
  static contextType = LanguageContext;

  componentDidMount() {
    this.context.getLanguage()

  }

  render() {
    return (
      <section className = 'dashboard-section'>
        <h2>Learn {this.context.language.name}</h2>
        <h2>Total correct answers: {this.context.language.total_score}</h2>
        <Link to='/learn' className = 'startpracticing'>
          Start practicing
        </Link>
        <div>
          <h3>Words to practice</h3>

          {this.context.words.map(word =>
            <ul key={word.id}>
              <li><h4>{word.original}</h4>
                <br /> correct answer count: {word.correct_count} <br />
                incorrect answer count: {word.incorrect_count}</li>
            </ul>)}
        </div>
      </section>
    )
  }
}