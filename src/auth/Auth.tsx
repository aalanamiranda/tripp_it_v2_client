import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Container from '@material-ui/core/Container';


type AcceptedProps = {
    updateToken: any
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

type iState = {
    isOpen: Boolean,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

class Auth extends Component<AcceptedProps, iState> {
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            isOpen: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '' 
        }

        //this.Toggle = this.Toggle.bind(this);
    }

    Toggle: any = () => { this.setState({isOpen: !this.state.isOpen}) }

  

    render(){
        return(
            <div>
                <Container >
                    {this.state.isOpen ? (
                        <div>
                            <Login 
                                updateToken={this.props.updateToken} 
                                email={this.state.email} 
                                password={this.state.password}
                            />
                            <br />
                            <h6>Don't have an account?<a href="#" onClick={this.Toggle}>Sign Up</a></h6>
                        </div>
                    ) : (
                        <div>
                            <SignUp 
                                updateToken={this.props.updateToken} 
                                firstName={this.state.firstName} 
                                lastName={this.state.lastName} 
                                email={this.state.email} 
                                password={this.state.password}
                            />
                            <br />
                            <h6>Go back? <a href="#" onClick={this.Toggle}>Login</a></h6>
                        </div>
                    )}
                </Container>
            </div>
        )
    }
}

export default Auth;