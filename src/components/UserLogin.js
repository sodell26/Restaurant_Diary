import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default function UserLogin (props) {

          return(
            <>
              <form onSubmit={props.loggingUser}>

                  <label htmlFor="username">Username:</label>
                  <input type='text' id='username' name='username'></input>

                  <label htmlFor="password">Password:</label>
                  <input type='text' id="password" name='password'></input>

                  <Button variant="light" type='submit'>Login</Button>
              </form>
            </>
          )
      }
