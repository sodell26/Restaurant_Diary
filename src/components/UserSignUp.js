import React from 'react';
import Button from 'react-bootstrap/Button';

export default function UserSignup(props) {

    return(
      <div>
        <form onSubmit={props.register}>
          <label htmlFor="username">Username: </label>
          <input className="inputField" type="text" id="username" name="username"></input>

          <label className="inputField" htmlFor="password">Password: </label>
          <input className="inputField" type="password" id="password" name="password"></input>

          <label className="inputField" htmlFor="confirmPassword">Confirm Password:</label>
                  <input className="inputField" type='password' id="confirmPassword" name='confirmPassword'></input>

          <Button className="create-btn" variant="light" type="submit" value="Sign Up">Create Account</Button>

        </form>

      </div>
    )
}