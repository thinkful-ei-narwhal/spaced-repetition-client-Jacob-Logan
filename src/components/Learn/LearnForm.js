import React from 'react'
import { Input, Label } from '../Form/Form'
import LanguageContext from '../../contexts/LanguageContext'
import languageService from '../../services/languageService'
import Button from '../Button/Button'
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
                    submitted: true
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
    //return h2 from the server?

    renderButton = () => {
        if (this.state.submitted) {
            return <Button onClick={(e) => this.nextWord(e)}>Try another word!</Button>
        }
        else {
            return <Button type='submit'>Submit your answer</Button>
        }
    }

    render() {
        return (
            <div>
                <div className="DisplayScore">
                    <p>Your total score is&#58; {this.state.totalScore}</p>
                </div>
                {
                    (this.state.isCorrect === null)
                        ? <h2>Translate the word&#58;</h2> : <div></div>
                }
                {
                    (this.state.isCorrect === false)
                        ? <h2>Good try, but not quite right &#58;&#40;</h2> : <div></div>
                }
                {
                    (this.state.nextWord !== this.state.currentWord && this.state.isCorrect === true)
                        ? <h2>You were correct! &#58;D</h2> : <div></div>
                }
                {
                    (this.state.nextWord === this.state.currentWord)
                        ? <h2>Translate the word&#58;</h2> : <div></div>
                }
                {/* {
                    (this.state.isCorrect === true)
                        ? setTimeout(() => { return (<h2>You were correct! &#58;D</h2>) }, 1000) : <div></div>
                } */}
                <span>{this.state.nextWord}</span>

                <div className="DisplayFeedback">
                    {
                        (this.state.submitted === true && this.state.isCorrect === true)
                            ? <p>The correct translation for {this.state.currentWord} was {this.state.answer} and you chose {this.state.guess}!</p>
                            : <div></div>
                    }
                    {
                        (this.state.submitted === true && this.state.isCorrect === false)
                            ? <p>The correct translation for {this.state.currentWord} was {this.state.answer} and you chose {this.state.guess}!</p>
                            : <div></div>
                    }
                </div>


                <form onSubmit={(e) => this.handleSubmitGuess(e)}>
                    <Label htmlFor='learn-guess-input'>
                        What's the translation for this word?
                    </Label>

                    <Input id='learn-guess-input' type='text' placeholder='eg. hello' required onChange={(e) => this.setInputVal(e)} />
                    {
                        (this.state.nextWord !== this.state.currentWord && this.state.submitted === true)
                            ? <Button type='submit'>Try another word!</Button> :

                            (this.state.nextWord === this.state.currentWord || this.state.submitted === false)
                                ? <Button Button type='submit'>Submit your answer</Button> : <div></div>
                    }



                </form>
                You have answered this word correctly { this.state.wordCorrectCount} times.
                You have answered this word incorrectly { this.state.wordIncorrectCount} times.
            </div>
        )
    }
}
