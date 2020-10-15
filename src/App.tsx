import React, { Component } from 'react';
import './App.css';
import Auth from './auth/Auth';
import Homepage from './home/Homepage'
import Container from '@material-ui/core/Container';

//in order to modify state from child components, create methods that utilize setState to modify state and pass down to child components

type iState = {
  sessionToken: string | null,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

class App extends Component<{}, iState> {
  /* const [sessionToken, setSessionToken] = useState<string | null>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); */
  constructor(props: iState){
    super(props)
    this.state = {
      sessionToken: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  getToken: any = () => {
    if(localStorage.getItem('token')){
      this.setState({ sessionToken: localStorage.getItem('token') });
    }
  }

  /* useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, []) */

  updateToken: any = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: localStorage.getItem('token') });
    console.log(this.state.sessionToken);
  }

  clearToken: any =  () => {
    localStorage.clear();
    this.setState({ sessionToken: '' });
  }

  render(){
    return (
      <div className={!this.state.sessionToken ? "loginPage" : "homePage"} >
        <Container >
          {!this.state.sessionToken ?
          <Auth 
            updateToken={this.updateToken} 
            firstName={this.state.firstName} 
            lastName={this.state.lastName}
            email={this.state.email}
            password={this.state.password}
          />
          :
          <div>
            <Homepage 
              sessionToken={this.state.sessionToken}
              clickLogout={this.clearToken}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
            />
          </div>
          }
        </Container>
      </div>
    );
  }
  
}

export default App;
