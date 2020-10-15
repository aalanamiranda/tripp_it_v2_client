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
    password: string
}

type iState = {
    isValidEmail: boolean,
    isError: boolean,
    email: string,
    password: string
}

class Login extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state ={
            isValidEmail: false,
            isError: false,
            email: '',
            password: ''
        }
    }

    handleSubmit:any = (event: FormEvent, error: ErrorEvent, values: string)=> {
        event.preventDefault();
        if (!error) {
                fetch(`${APIURL}/user/login`, {
                method: "POST",
                body: JSON.stringify({
                    user: {
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
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                    required id="li-email-input"
                    label="Email" 
                    />
                    <br />
                    <TextField
                    required id="li-pass-word"
                    label="Password"
                    type="password"
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Log In
                    </Button>
                </form>
            </div>
        )
    }
}

export default Login
