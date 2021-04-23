import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default function UserLogin (props) {

          return(
            <>
              <form onSubmit={props.loggingUser}>

                  <label htmlFor="username">Username:</label>
                  <input className="inputField" type='text' id='username' name='username'></input>

                  <label className="inputField" htmlFor="password">Password:</label>
                  <input className="inputField" type='password' id="password" name='password'></input>


                  <Button className="login-btn" variant="light" type='submit'>Login</Button>
              </form>
            </>
          )
      }
