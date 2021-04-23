import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import './App.css';
import NewEntry from './components/NewEntry';
import NavBar from './components/NavBar'

// import RatingPage from './components/StarRating'

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
      loggedIn: false ,
      showLanding: true
    }
  }

// fetch to backend
  getReviews = () => {
    fetch(baseUrl + '/reviews',{
      credentials: "include"
    })
    .then(res => { 
      if (res.status === 200 || res.status=== 201) {
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
      },
      credentials: 'include'
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
    let loginBody = {
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
          loggedIn: true ,
          showLanding: false
        })
        // loginBody = {
        //   username: '',
        //   password: ''
        // }
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }    
  }

  register = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/account/signup'

    if (e.target.password.value !== e.target.confirmPassword.value){
      alert('passwords do not match')
      } else {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
          confirmPassword: e.target.confirmPassword.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.status === 409) {
          console.log('user already exists')
          alert("User Already Exists")
      }
     else if (response.status === 201) {
        console.log('register hit')

      this.loggingUser(e)
      this.setState()
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
      // this.getReviews()
      this.setState({
        loggedIn: false ,
        showLanding: true
      })
    } 
  }

  render () {
    return(
      <div>
        <NavBar loggedIn={this.state.loggedIn} loggingUser={this.loggingUser}logOut={this.logOut} register={this.register}/>

      {this.state.showLanding &&
        <div className='landingPage'>
          <h3 className='landingPageh3'>People who love to eat <br></br> are always the best people <br></br> <small>-Julia Child</small></h3>
          </div>
      }

        {this.state.loggedIn && 
          <div class="flexbox-container">
            <div>
              <Button variant="dark" onClick={e => this.showNewForm(e)}>Add New Review</Button>
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
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>Rating:{entry.rating}</ListGroup.Item>
                        <ListGroup.Item>{entry.address}</ListGroup.Item>
                        <ListGroup.Item>Meal:{entry.meal}</ListGroup.Item>
                        <ListGroup.Item>${entry.cost}</ListGroup.Item>
                      </ListGroup>
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
            <div>
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

                <input type="submit" value="Submit Change"></input>

              </form>
          </div>
          }
          </div>
          <div>
            <Map />
          </div>
        }

          </div>
      }
        
        
      </div>

    )
  }

}

export default App;
