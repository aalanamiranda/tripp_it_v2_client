import React, { Component, FormEvent } from 'react';
import APIURL from "../../helpers/environment";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type AcceptedProps = {
    sessionToken: string,
    activityList: object[],
    createActivityEntry: any
}

type iState = {
    title: string,
    startDate: string,
    endDate: string,
    description: string | null
}

class NewActivity extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            title: '',
            startDate: '',
            endDate: '',
            description: null
        }
    }

    handleSubmit:any = (event: FormEvent, error: ErrorEvent, values: string)=> {
        event.preventDefault();
        if (!error) {
            console.log(this.state)
                fetch(`${APIURL}/activity/`, {
                method: "POST",
                body: JSON.stringify({
                    activity: {
                        title: this.state.title,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        description: this.state.description
                    },
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
                })
              .then((res) => res.json())
              .then((data) => {
                this.props.createActivityEntry(data)
                console.log("Activity Created Successfully");
              })
              .catch((err) => alert(err));
          }
    }

    render(){
        return(
            <div>
                New Activity
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        required id="new-trip-input"
                        label="Title" 
                        onChange={(e) => { this.setState({ title: e.target.value }); console.log(this.state.title) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="Start Date"
                        type="date" 
                        defaultValue="2020-10-13"
                        onChange={(e) => { this.setState({ startDate: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="End Date" 
                        type="date"
                        defaultValue="2020-10-13"
                        onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        id="new-trip-input"
                        label="Description" 
                        onChange={(e) => { this.setState({ description: e.target.value }) }}
                    />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Create Activity
                    </Button>
                </form>
            </div>
        )
    }
}

export default NewActivity;
