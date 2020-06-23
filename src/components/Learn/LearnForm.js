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
    // INSTEAD OF DISPLAYING FIRST WORD IN THE LIST NEED TO CREATE A LINKED LIST TO GRAB 
    // THE CORRECT WORD BASED OFF OF ALGORITHM CRITERIA
    // SO LANGUAGESERVICE.GETCORRECTWORD WILL NEED TO BE CHANGED COMPLETELY 


    guessInput = React.createRef()

    state = {
        guess: '',
        currentWord: '',
        currentWordTranslation: '',
        words: [],
        isRight: false,
        isWrong: false,
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

    sortWordsByMValue = () => {
        // sort by ascending order of M value
        // sortedWords = words.sort()
    }


    handleSubmitGuess = (e) => {
        e.preventDefault()
        if (this.state.guess === this.state.currentWordTranslation) {
            //binary = 1 means right answer
            const binary = 1
            languageService.submitGuess(binary, this.state.currentWordId)
            console.log('CORRECT')
            this.setState({ isRight: true })
        }
        else {
            //with binary = 0 this means wrong annswer
            const binary = 0
            languageService.submitGuess(binary, this.state.currentWordId)
            console.log('XXX')
            this.setState({ isWrong: true })

        }
    }

    setInputVal = (e) => {
        e.preventDefault()
        this.setState({
            guess: e.target.value
        })
    }

    render() {
        console.log(this.state.guess, this.state.currentWordTranslation)
        console.log(this.state.correctWordCount)
        return (
            <div>
                <h2>Translate the word:</h2>
                <span>{this.state.nextWord}</span>
                <p>Your total score is: {this.state.totalScore}</p>
                <div>
                    {this.state.currentWord}
                </div>
                <form onSubmit={(e) => this.handleSubmitGuess(e)}>
                    <Label htmlFor='learn-guess-input'>
                        What's the translation for this word?
                    </Label>
                    <Input id='learn-guess-input' type='text' placeholder='eg. hello' required onChange={(e) => this.setInputVal(e)} />
                    <Button type='submit'>Submit your answer</Button>
                </form>
                {(this.state.isRight) ? <div> Nice Job </div> : ''}
                {(this.state.isWrong) ? <div> Oops try again </div> : ''}
                You have answered this word correctly {this.state.wordCorrectCount} times.
                You have answered this word incorrectly {this.state.wordIncorrectCount} times.

            </div>
        )
    }
}