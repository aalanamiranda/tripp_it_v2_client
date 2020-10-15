import React, { Component, FormEvent } from 'react';
import Container from '@material-ui/core/Container';
import APIURL from "../helpers/environment";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

type AcceptedProps = {
    updateToken: any,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

type iState = {
    isValidEmail: boolean,
    isError: boolean,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

class SignUp extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state ={
            isValidEmail: false,
            isError: false,
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    handleSubmit:any = (event: FormEvent, error: ErrorEvent, values: string)=> {
        event.preventDefault();
        console.log(this.state)
        if (!error) {
            fetch(`${APIURL}/user/signup`, {
              method: "POST",
              body: JSON.stringify({
                user: {
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  email: this.state.email,
                  password: this.state.password,
                },
              }),
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            })
              .then((res) => {
                if (res.status !== 200) {
                    res.json().then(err => {alert(err.error)})
                    throw new Error("User does not exist");
                } else return res.json();
              })
              .then((data) => {
                console.log(data);
                this.props.updateToken(data.sessionToken)
                this.updateSessionName(`${data.user.firstName} ${data.user.lastName}`);
                console.log("User successfully logged in");
              })
              .catch((err) => alert(err));
          }
    }

    updateSessionName: any = (newName: string) => {
        localStorage.setItem("newName", newName);
    };

    render(){
        return(
            <div>
                <h1>Signup</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                    required id="si-firstname-input"
                    label="First Name"
                    onChange={(e) => this.setState({ firstName: e.target.value })} 
                    />
                    <br />
                    <TextField
                    required id="si-lastname-input"
                    label="Last Name"
                    onChange={(e) => this.setState({ lastName: e.target.value })}
                    />
                    <br />
                    <TextField 
                    required id="si-email-input"
                    label="Email" 
                    onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <br />
                    <TextField
                    required id="si-password-input"
                    label="Password"
                    type="password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Sign Up
                    </Button>
                </form>
            </div>
        )
    }
}

export default SignUp;