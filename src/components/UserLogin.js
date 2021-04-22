import React, { Component } from 'react' 

export default function UserLogin (props) {

          return(
            <>
              <form onSubmit={props.loggingUser}>
                  <strong>Login</strong>
                  <label htmlFor="username">Username:</label>
                  <input type='text' id='username' name='username'></input>

                  <label htmlFor="password">Password:</label>
                  <input type='password' id="password" name='password'></input>

                  <input type='submit' value='Login'></input>
              </form>
            </>
          )
      }
