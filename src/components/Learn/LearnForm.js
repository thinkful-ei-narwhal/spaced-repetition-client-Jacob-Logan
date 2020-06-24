import React from 'react'
import { Input, Label } from '../Form/Form'
import LanguageContext from '../../contexts/LanguageContext'
import languageService from '../../services/languageService'
import Button from '../Button/Button'
export default class LearnForm extends React.Component {

    static contextType = LanguageContext

    //User is presented with word in french, and an input box
    //user types guess into input box
    //check word against guess
    //if right send 1, wrong 0
    //also send id of word in the body

    //when submit -> give feedback, update scores, show correct answer 
    // button appears to see next word 


    //TODO: 



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
        wordIncorrectCount: null
    }

    componentDidMount() {
        languageService.getCurrentWord()
            .then(res => {
                console.log(res)
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
            .then(res => this.setState({
                answer: res.answer,
                isCorrect: res.isCorrect,
                nextWord: res.nextWord,
                totalScore: res.totalScore,
                wordCorrectCount: res.wordCorrectCount,
                wordIncorrectCount: res.wordIncorrectCount
            }))

        // this.setState({ icCorrect: true })
    }

    setInputVal = (e) => {
        e.preventDefault()
        this.setState({
            guess: e.target.value
        })
    }

    render() {
        // console.log(this.state.guess, this.state.currentWordTranslation)
        // console.log(this.state.correctWordCount)
        return (
            <div>


                {
                    (this.state.isCorrect === true) ? <h2>You were correct! &#58;D</h2> && <p>Your total score is: {this.state.totalScore}</p>
                        :
                        (this.state.isCorrect === false) ? <h2>Good try, but not quite right &#58;&#x28;</h2>
                            :
                            (this.state.isCorrect === null) ? <h2>Translate the word&#58;</h2> : <div></div>}

                <div className="DisplayFeedback">
                    {(this.state.isCorrect === false) ? <p>The correct translation for {this.state.currentWord} was {this.state.answer} and you chose {this.state.guess}!</p>
                        :
                        (this.state.isCorrect === true) ? <p>The correct translation for {this.state.currentWord} was {this.state.answer} and you chose {this.state.guess}!</p>
                            : <p></p>
                    }
                </div>

                <span>{this.state.nextWord}</span>
                <div className="DisplayScore">
                    {(this.state.currentWord !== '') ? <p>Your total score is: {this.state.totalScore}</p> : <p></p>}
                </div>


                <h2>Translate the word&#58;</h2> {this.state.currentWord}

                <form onSubmit={(e) => this.handleSubmitGuess(e)}>
                    <Label htmlFor='learn-guess-input'>
                        What's the translation for this word?
                    </Label>
                    <Input id='learn-guess-input' type='text' placeholder='eg. hello' required onChange={(e) => this.setInputVal(e)} />
                    <Button type='submit'>Submit your answer</Button>
                    {/* <Button type='submit'>Try another word!</Button> */}
                </form>


                You have answered this word correctly {this.state.wordCorrectCount} times.
                You have answered this word incorrectly {this.state.wordIncorrectCount} times.

            </div>
        )
    }
}