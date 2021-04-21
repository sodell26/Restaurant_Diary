import React, { Component } from 'react' 

export default class NewEntry extends Component {
    constructor(props){
        super(props)

        this.state = {
            restName: '' ,
            address: '' ,
            rating: 0,
            meal: '' ,
            cost: 0,
            notes: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit (event) {
        event.preventDefault()

        //fetch
        fetch(this.props.baseUrl + '/reviews/new', {
            method: 'POST',
            body: JSON.stringify({
                restName: this.state.restName,
                address: this.state.address,
                rating: this.state.rating,
                meal: this.state.meal,
                cost: this.state.cost,
                notes: this.state.notes,
                modalNewOpen: this.state.modalNewOpen}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }).then( res => {
            return res.json()
        }).then( data => {
            this.props.addReview(data)
            this.setState({    
                restName: '',
                address: '',
                rating: '',
                meal: '',
                cost: '',
                notes: ''
            })
        }).catch(error => console.log({'Error': error}))
    }



    render() {
        console.log(this.state)

        return(
            <>
            <form onSubmit={ (event) => this.handleSubmit(event) }>

                <label htmlFor='restName'>Restaurant Name:</label>
                <input type='text' id='restName' name="restName" onChange={ (event) => this.handleChange(event) } value={this.state.restName}></input>

                <label htmlFor='address'>Address:</label>
                <input type='text' id='address' name="address"onChange={ (event) => this.handleChange(event) } value={this.state.address}></input>

                <label htmlFor='rating'>Rating:</label>
                <input type='number' id='rating' name="rating"onChange={ (event) => this.handleChange(event) } value={this.state.rating}></input>

                <label htmlFor='meal'>Meal:</label>
                <input type='text' id='meal' name="meal"onChange={ (event) => this.handleChange(event) } value={this.state.meal}></input>

                <label htmlFor='cost'>Cost:</label>
                <input type='number' id='cost' name="cost"onChange={ (event) => this.handleChange(event) } value={this.state.cost}></input>

                <label htmlFor='notes'>Notes:</label>
                <input type='text' id='notes' name="notes"onChange={ (event) => this.handleChange(event) } value={this.state.notes}></input>

                <input type='submit' value='Add Review'></input>

            </form>
            <button onClick={this.props.onClose}>Close</button>
            </>
        )
    }

}