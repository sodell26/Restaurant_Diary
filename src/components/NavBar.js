import React, { Component } from 'react';
import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap'


export default class NavBar extends Component {
	constructor(props) {
		super(props)

		this.state={
			loginShow: false,
			signupShow: false
		}
	}

	showLogin = (entry) => {
		this.setState({
			loginShow: !this.state.loginShow,
			signupShow: false
		})
	}

	showSignUp = (entry) => {
		this.setState({
			loginShow: false,
			signupShow: !this.state.signupShow
		})
	}

	render() {
		return(
		
			<Navbar bg='info' variant="dark">
				<Navbar.Brand>Restaurant Diary</Navbar.Brand>
				<Nav>
					<Nav.Link onClick= {this.showLogin}>Login</Nav.Link>
					{this.state.loginShow &&
						<UserLogin loggingUser={this.props.loggingUser}/>
					}
					<Nav.Link onClick={this.showSignUp}>Sign Up</Nav.Link>
					{this.state.signupShow &&
						<UserSignUp register={this.props.register}/>
					}
					{this.props.loggedIn &&
						<Button onClick={this.props.logOut}>Log Out</Button>
					}
				</Nav>	
			</Navbar>
			
		)
	}
}









