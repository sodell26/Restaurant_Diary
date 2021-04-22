import React from 'react';
import Button from 'react-bootstrap/Button';

export default function UserSignup(props) {

    return(
      <div>
        <form onSubmit={props.register}>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username"></input>

          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password"></input>

          <Button variant="light" type="submit" value="Sign Up">Create Account</Button>

        </form>

      </div>
    )
}