import React, { Component } from 'react';
import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap'


export default class NavBar extends Component {
	constructor(props) {
		super(props)

	}
	

	render() {
		return(
		
			<Navbar sticky="top" bg='info' variant="dark">
				<Navbar.Brand>Restaurant Diary</Navbar.Brand>
				<Nav>
					<Nav.Link onClick= {this.props.showLogin}>Login</Nav.Link>
					{this.props.loginShow &&
						<UserLogin loggingUser={this.props.loggingUser}/>
					}
					<Nav.Link onClick={this.props.showSignUp}>Sign Up</Nav.Link>
					{this.props.signupShow &&
						<UserSignUp register={this.props.register}/>
					}
					{this.props.loggedIn &&
						<Button onClick={this.props.logOut}>Log Out</Button>
					}
					<Nav className="float-sm-right">
						<Navbar.Brand>{this.props.usersName}</Navbar.Brand>
					</Nav>
				</Nav>	
			</Navbar>
			
		)
	}
}









