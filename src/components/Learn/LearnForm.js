import React from 'react'
import { Input, Label } from '../Form/Form'
import LanguageContext from '../../contexts/LanguageContext'
import languageService from '../../services/languageService'
export default class LearnForm extends React.Component {

    static contextType = LanguageContext

    guessInput = React.createRef()

    state = {
        guess: '',
        currentWord: '',
        answer: '',
        words: [],
        isCorrect: null,
        nextWord: null,
        totalScore: null,
        wordCorrectCount: null,
        wordIncorrectCount: null,
        submitted: false
    }

    componentDidMount() {
        languageService.getCurrentWord()
            .then(res => {
                this.setState({
                    nextWord: res.nextWord,
                    totalScore: res.totalScore,
                    wordCorrectCount: res.wordCorrectCount,
                    wordIncorrectCount: res.wordIncorrectCount
                })
            })

    }

    handleSubmitGuess = (e) => {
        e.preventDefault()
        this.setState({ currentWord: this.state.nextWord })
        languageService.submitGuess(this.state.guess)
            .then(res =>
                this.setState({
                    answer: res.answer,
                    isCorrect: res.isCorrect,
                    nextWord: res.nextWord,
                    totalScore: res.totalScore,
                    wordCorrectCount: res.wordCorrectCount,
                    wordIncorrectCount: res.wordIncorrectCount,
                    submitted: true,
                }))

    }

    setInputVal = (e) => {
        e.preventDefault()
        this.setState({
            guess: e.target.value
        })
    }


    nextWord = (e) => {
        e.preventDefault()
        languageService.getCurrentWord()
            .then(res => {
                this.setState({
                    wordCorrectCount: res.wordCorrectCount,
                    wordIncorrectCount: res.wordIncorrectCount,
                    submitted: false,
                })

            })
    }

    renderButton = () => {
        if (this.state.submitted) {
            return <button onClick={(e) => this.nextWord(e)}>Try another word!</button>
        }
        else {
            return <button type='submit'>Submit your answer</button>
        }
    }

    renderInput = () => {
        if (!this.state.submitted) {
            return <Input value={this.state.guess} autoFocus id='learn-guess-input' type='text' placeholder='translate the word' required onChange={(e) => this.setInputVal(e)} />
        }
        else {
            return <> </>
        }
    }

    render() {
        return (
            <div className='learn-form'>
                {
                    (this.state.submitted)
                        ? (this.state.isCorrect)
                            ? <h2>You were correct! &#58;D</h2>
                            : <h2>Good try, but not quite right &#58;&#x28;</h2>
                        : <h2>Translate the word:</h2>
                }
                <div className="DisplayFeedback">
                    {
                        (this.state.submitted)
                            ? <p>The correct translation for {this.state.currentWord} was {this.state.answer} and you chose {this.state.guess}!</p>
                            : ''
                    }
                </div>
                {
                    (this.state.submitted === false)
                        ? <span>{this.state.nextWord}</span> : ''
                }

                <div className="DisplayScore">
                    <p>Your total score is: {this.state.totalScore}</p>
                </div>

                <form onSubmit={(e) => this.handleSubmitGuess(e)}>
                    {
                        (this.state.submitted === false)
                            ? <Label htmlFor='learn-guess-input'>
                                What's the translation for this word?
                    </Label> : ''
                    }

                    {this.renderInput()}
                    {this.renderButton()}
                </form>
                You have answered this word correctly {this.state.wordCorrectCount} times.
                You have answered this word incorrectly {this.state.wordIncorrectCount} times.
            </div>
        )
    }
}
