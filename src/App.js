import './App.css';
import React, { Component } from 'react'
import NewEntry from './components/NewEntry'

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

  render () {
    console.log(this.state.reviewEntries)
    return(

      <div>
        <h1>Restaurant Diary</h1>
        <NewEntry baseUrl={baseUrl} addReview={this.addReview}/>
        <table>
          <tbody>
            {this.state.reviewEntries.map(entry => {
              return (
                <tr key={entry._id}>
                 <td>{entry.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    )
  }

}

export default App;
