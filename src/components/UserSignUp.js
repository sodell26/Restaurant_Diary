import React from 'react' 

export default function UserSignup(props) {

    return(
      <div>
        <form onSubmit={props.register}>
          <strong>Register</strong>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username"></input>

          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password"></input>

          <input type="submit" value="Sign Up"></input>

        </form>

      </div>
    )
}