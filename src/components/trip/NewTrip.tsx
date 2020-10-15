import React, { Component, FormEvent } from 'react';
import APIURL from "../../helpers/environment";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type AcceptedProps = {
    tripList: object[],
    sessionToken: string,
    createTripEntry: any
}

type iState = {
    title: string,
    departLoc: string,
    arrivalLoc: string,
    startDate: string,
    endDate: string,
    travelMethod: string | null,
    reason: string | null ,
    description: string | null
}

class NewTrip extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            title: '',
            departLoc: '',
            arrivalLoc: '',
            startDate: '',
            endDate: '',
            travelMethod: null,
            reason: null ,
            description: null
        }
    }


    handleSubmit:any = (event: FormEvent, error: ErrorEvent, values: string)=> {
        event.preventDefault();
        if (!error) {
                fetch(`${APIURL}/trip/`, {
                method: "POST",
                body: JSON.stringify({
                    trip: {
                        title: this.state.title,
                        departLoc: this.state.departLoc,
                        arrivalLoc: this.state.arrivalLoc,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        travelMethod: this.state.travelMethod,
                        reason:  this.state.reason,
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
                this.props.createTripEntry(data)
                console.log(data)
                console.log("Trip Created Successfully");
              })
              .catch((err) => alert(err));
          }
    }

    

    render(){
        return(
            <div>
                New Trip
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        required id="new-trip-input"
                        label="Title" 
                        onChange={(e) => { this.setState({ title: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="From" 
                        onChange={(e) => { this.setState({ departLoc: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="To"
                        onChange={(e) => { this.setState({ arrivalLoc: e.target.value }) }} 
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="Departure Date"
                        type="date" 
                        defaultValue="2020-10-13"
                        onChange={(e) => { this.setState({ startDate: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="Arrival Date" 
                        type="date"
                        defaultValue="2020-10-13"
                        onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        id="new-trip-input"
                        label="Method of Travel" 
                        onChange={(e) => { this.setState({ travelMethod: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        id="new-trip-input"
                        label="Reason for Travel" 
                        onChange={(e) => { this.setState({ reason: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        id="new-trip-input"
                        label="Description" 
                        onChange={(e) => { this.setState({ description: e.target.value }) }}
                    />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Create Trip
                    </Button>
                </form>
            </div>
        )
    }
}

export default NewTrip;
