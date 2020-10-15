import React, { Component } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

type AcceptedProps = {
    clickLogout: any,
    sessionToken: string,
    firstName: string,
    lastName: string
}

type iState = {
    name: string | null
}

class Navbar extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            name: ''
        }
    }

    componentDidMount(){
        if (localStorage.getItem("newName")) {
            this.setState({ name: (localStorage.getItem("newName")) });
        }
    }

    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Tripp It v2
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={this.props.clickLogout} 
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar;