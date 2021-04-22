import React, { Component } from 'react';
import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';
import Button from 'react-bootstrap/Button';


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
		
			<nav>
				<h1>Restaurant Diary</h1>
				<ul>
					<li> <Button onClick= {this.showLogin}>Login</Button></li>
					{this.state.loginShow &&
						<UserLogin loggingUser={this.props.loggingUser}/>
					}
					<li><Button onClick={this.showSignUp}>Sign Up</Button></li>
					{this.state.signupShow &&
						<UserSignUp register={this.props.register}/>
					}
					{this.props.loggedIn &&
						<Button onClick={this.props.logOut}>Log Out</Button>
					}
				</ul>	
			</nav>
			
		)
	}
}









