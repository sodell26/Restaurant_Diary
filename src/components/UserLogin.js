import React, { Component } from 'react' 

export default class UserLogin extends Component {

    constructor(props){
        super(props)

        this.state = {
            username: '' ,
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //fetch to backend
      //add to every fetch request?
      getUserLogin = () =>{
        fetch(this.props.baseUrl  + '/account/login', {
            method: 'GET', 
            mode: 'cors', 
            credentials: 'include',
          }) 
      }

      handleSubmit(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
      }

      handleChange(event) {
        event.preventDefault()

        fetch(this.props.baseUrl + '/new', {
            method: 'GET', 
            mode: 'cors', 
            credentials: 'include',
          })
      }

      render() {
          console.log(this.state)

          return(
              <form>
                  <label>Username:</label>
                  <input type='text' id='username' value={this.state.username}></input>

                  <label>Password:</label>
                  <input type='text' id='password' value={this.state.password}></input>

                  <input type='submit' value='Create Account'></input>
              </form>
          )
      }


}