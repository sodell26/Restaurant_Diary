import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import './App.css';
import NewEntry from './components/NewEntry';
import UserLogin from './components/UserLogin'

//mapbox
import Map from './Map'

console.log(process.env.NODE_ENV)
let baseUrl = ''

if(process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
}else {
  baseUrl = 'heorku url here'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewEntries: [],
      modalOpen: false,
      modalNewOpen: false,
      entryToEdit: {},
      restName:'',
      address: '' ,
      rating: 0,
      meal: '' ,
      cost: 0,
      notes: '',
      loggedIn: false
    }
  }

// fetch to backend
  getReviews = () => {
    fetch(baseUrl + '/reviews',{
      credentials: "include"
    })
    .then(res => { 
      if (res.status === 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data => {
      this.setState({
        reviewEntries: data
      })
    })
  }

  addReview = (newReview) => {
    const copyReviews = [...this.state.reviewEntries]
    copyReviews.push(newReview)
    this.setState({
      reviewEntries: copyReviews
    })
  }


  componentDidMount() {
    this.getReviews()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteReview = async (id) =>{
    const url = baseUrl + '/reviews/' + id
    
    try{
      const response = await fetch(url, {method: 'DELETE'})

      const index = this.state.reviewEntries.findIndex(review => review._id === id)
      const copyReviews = [...this.state.reviewEntries]

      copyReviews.splice(index, 1)

      this.setState({
        reviewEntries: copyReviews
      })
    }
    catch(error){
      console.log('error: ', error)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const url = baseUrl + '/reviews/' + this.state.entryToEdit._id

    const response = await fetch ( url, {
      method: 'PUT', 
      body: JSON.stringify({
      restName: e.target.restName.value,
      address: e.target.address.value,
      rating: e.target.rating.value,
      meal: e.target.meal.value,
      cost: e.target.cost.value,
      notes: e.target.notes.value
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    if (response.status === 200) {
      const updatedEntry = await response.json()

      const findIndex = this.state.reviewEntries.findIndex(entry => entry._id === updatedEntry.data._id)

      const copyEntries = [...this.state.reviewEntries]
      copyEntries[findIndex] = updatedEntry.data

      this.setState({
        reviewEntries: copyEntries,
        modalOpen: false,
        modalNewOpen: false
      })
    }

  }


  showEditForm = (entry) => {
    this.setState({
      modalOpen: true,
      modalNewOpen: false,
      restName: entry.restName,
      address: entry.address,
      rating: entry.rating,
      meal: entry.meal,
      cost: entry.cost,
      notes: entry.notes,
      entryToEdit: entry

    })
  }

  showNewForm = (entry) => {
    this.setState({
      modalOpen: false,
      modalNewOpen: !this.state.modalNewOpen,
      restName: '',
      address: '',
      rating: '',
      meal: '',
      cost: '',
      notes: ''
    })
  }

  onClose = e => {
        this.setState({
            modalNewOpen: false
        });
    }


  loggingUser = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/account/login'
    const loginBody = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include" 
      })

      if (response.status === 200) {
        this.getReviews()
        this.setState({
          loggedIn: true
        })
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }    
  }

  register = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/account/signup'

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      this.setState({
        loggedIn: false
      })
    } 
  }

  logOut = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/account/logout'

    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        username: '',
        password: ''
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      this.getReviews()
      this.setState({
        loggedIn: false
      })
    } 
  }

  render () {
    console.log(this.state.reviewEntries)
    return(

      <>
        <h1>Restaurant Diary</h1>
        <UserLogin loggingUser={this.loggingUser} register={this.register}/>
        <button onClick={this.logOut}>Log Out</button>
        {this.state.loggedIn && 
          <div>
            <Button variant="info" onClick={e => this.showNewForm(e)}>Add New Review</Button>
            {this.state.modalNewOpen &&
              <NewEntry baseUrl={baseUrl} addReview={this.addReview} onClose={this.onClose}/>
            }
            <div class="card-container">
                {this.state.reviewEntries.map(entry => {
                  return (
                    <Card style={{ width: '18rem'}} key={entry._id}>
                        <Card.Body>
                       <Card.Title>{entry.restName}</Card.Title>
                       <Card.Text>{entry.notes}</Card.Text>
                      </Card.Body>
                      {<ListGroup className="list-group-flush">
                        <ListGroup.Item>{entry.rating}</ListGroup.Item>
                        <ListGroup.Item>{entry.address}</ListGroup.Item>
                        <ListGroup.Item>{entry.meal}</ListGroup.Item>
                        <ListGroup.Item>{entry.cost}</ListGroup.Item>
                      </ListGroup>}
                      <Card.Body>
                       <Card.Link onClick={()=>this.deleteReview(entry._id)}>X</Card.Link>
                       <Card.Link onClick={()=>this.showEditForm(entry)}>Edit</Card.Link>
                      </Card.Body>
                    </Card>
                  )
                })}


          </div>

          <br/>
          <br/>
          <br/>
          {this.state.modalOpen && 
            <form onSubmit={this.handleSubmit}>
              <label>Restaurant Name: </label>
              <input name="restName" value={this.state.restName} onChange={this.handleChange}/><br/>

              <label>Address: </label>
              <input name="address" value={this.state.address} onChange={this.handleChange}/><br/>

              <label>Rating: </label>
              <input name="rating" value={this.state.rating} onChange={this.handleChange}/><br/>

              <label>Meal: </label>
              <input name="meal" value={this.state.meal} onChange={this.handleChange}/><br/>

              <label>Cost: </label>
              <input name="cost" value={this.state.cost} onChange={this.handleChange}/><br/>

              <label>Notes: </label>
              <input name="notes" value={this.state.notes} onChange={this.handleChange}/><br/>

              <button>Submit Change</button>

            </form>
          }
        </div>
      }
      <Map />
      </>

    )
  }

}

export default App;
