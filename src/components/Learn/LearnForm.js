import React from 'react'
import { Input, Label } from '../Form/Form'
import LanguageContext from '../../contexts/LanguageContext'
import languageService from '../../services/languageService'
export default class LearnForm extends React.Component{

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
        isWrong: false
    }

    componentDidMount() {
        languageService.getCurrentWord()
            .then(res => {
                this.setState({
                    words: res.words,
                    currentWord: res.words[0].original,
                    currentWordTranslation: res.words[0].translation,
                    currentWordId: res.words[0].id
                })
            })
    }

    handleSubmitGuess = (e) => {
        e.preventDefault()
        if(this.state.guess === this.state.currentWordTranslation) {
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
        return (
            <>
                <div>
                    {this.state.currentWord}
                </div>
                <form onSubmit = {(e) => this.handleSubmitGuess(e)}>
                    <Label htmlFor = 'guess-input'>
                        Type Your Guess Here
                    </Label>
                    <Input name = 'guess-input' placeholder = 'eg. hello' onChange = {(e) => this.setInputVal(e)}/>
                    <Input type = 'submit' />
                </form>
                {(this.state.isRight) ? <div> Nice Job </div> : ''}
                {(this.state.isWrong) ? <div> Oops try again </div> : ''}

            </>
        )
    }
}