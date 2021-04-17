import './App.css';
import React, { Component } from 'react'

console.log(process.env.NODE_ENV)
let baseUrl = ''

if(process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000'
}else {
  baseUrl = 'heorku url here'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewEntries: []
    }
  }

// fetch to backend
  getReviews = () => {
    fetch(baseUrl + '/')
    .then(res => { return res.json()})
    .then(data => {
      this.setState({
        reviews: data
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


}

export default App;
