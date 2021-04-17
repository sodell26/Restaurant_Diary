import React, { Component } from 'react' 

export default class NewEntry extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '' ,
            address: '' ,
            rating: null ,
            meal: '' ,
            cost: null,
            notes: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        this.setState({
            name: event.target.value
        })
    }

    handleAddressChange (event) {
        this.setState({
            adress: event.target.value
        })
    }

    handleRatingChange (event) {
        this.setState({
            rating: event.target.value
        })
    }

    handleMealChange (event) {
        this.setState({
            meal: event.target.value
        })
    }

    handleCostChange (event) {
        this.setState({
            cost: event.target.value
        })
    }

    handleNotesChange (event) {
        this.setState({
            notes: event.target.value
        })
    }


    handleSubmit (event) {
        event.preventDefault()

        //fetch
        fetch(this.props.baseUrl + '/', {
            method: 'POST',
            body: JSON.stringify({name: this.state.name}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.join()
        }).then( data => {
            this.props.addReview(data)
            this.setState({
                name: ''
            })
        }).catch(error => console.log({'Error': error}))
    }

    render() {
        console.log(this.state.name)
        return(
            <form onSubmit={ (event) => this.handleSubmit(event) }>

                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name="name" onChange={ (event) => this.handleChange(event) } value={this.state.name}></input>

                <label htmlFor='address'>Address:</label>
                <input type='text' id='address' name="adress"onChange={ (event) => this.handleAddressChange(event) } value={this.state.adress}></input>

                <label htmlFor='rating'>Rating:</label>
                <input type='number' id='rating' name="rating"onChange={ (event) => this.handleRatingChange(event) } value={this.state.rating}></input>

                <label htmlFor='meal'>Meal:</label>
                <input type='text' id='meal' name="meal"onChange={ (event) => this.handleMealChange(event) } value={this.state.meal}></input>

                <label htmlFor='cost'>Cost:</label>
                <input type='number' id='cost' name="cost"onChange={ (event) => this.handleCostChange(event) } value={this.state.cost}></input>

                <label htmlFor='notes'>Notes:</label>
                <input type='text' id='notes' name="notes"onChange={ (event) => this.handleNotesChange(event) } value={this.state.notes}></input>

                <input type='submit' value='Add Review'></input>

            </form>
        )
    }

}