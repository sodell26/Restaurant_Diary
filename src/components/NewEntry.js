import React, { Componet } from 'react' 

export default class NewEntry extends Component {
    consructor(props){
        super(props)

        this.state = {
            name: '' ,
            address: '' ,
            rating: Number ,
            meal: '' ,
            cost: Number,
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
                <input type='text' id='name' onChange={ (event) => this.hangleChange(event) } value={this.state.name}></input>

                <label htmlFor='address'>Address:</label>
                <input type='text' id='address' onChange={ (event) => this.hangleChange(event) } value={this.state.name}></input>

                <label htmlFor='rating'>Rating:</label>
                <input type='number' id='rating' onChange={ (event) => this.hangleChange(event) } value={this.state.name}></input>

                <label htmlFor='meal'>Meal:</label>
                <input type='text' id='meal' onChange={ (event) => this.hangleChange(event) } value={this.state.name}></input>

                <label htmlFor='cost'>Cost:</label>
                <input type='number' id='cost' onChange={ (event) => this.hangleChange(event) } value={this.state.name}></input>

                <label htmlFor='notes'>Notes:</label>
                <input type='text' id='notes' onChange={ (event) => this.hangleChange(event) } value={this.state.name}></input>

                <input type='submit' value='Add Review'></input>

            </form>
        )
    }

}