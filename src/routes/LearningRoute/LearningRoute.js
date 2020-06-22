import React, { Component } from 'react'
import LearnFrom from '../../components/Learn/LearnForm'

//app gets next word to learn from the backend
//shown the word to learn
//shown current score
//shown the number of correct and incorrect guesses for that word
//presented an input to type in the guess


class LearningRoute extends Component {
  render() {
    return (
      <section>
        <LearnFrom />
      </section>
    );
  }
}

export default LearningRoute
