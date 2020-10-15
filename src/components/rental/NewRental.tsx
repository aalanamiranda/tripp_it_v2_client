import React, { Component, FormEvent } from 'react';
import APIURL from "../../helpers/environment";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type AcceptedProps = {
    rentalList: object[],
    sessionToken: string,
    createRentalEntry: any
}

type iState = {
    agency: string,
    item: string,
    startDate: string,
    endDate: string,
    description: string | null
}

class NewRental extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            agency: '',
            item: '',
            startDate: '',
            endDate: '',
            description: null
        }
    }

    handleSubmit:any = (event: FormEvent, error: ErrorEvent, values: string)=> {
        event.preventDefault();
        if (!error) {
                fetch(`${APIURL}/rental/`, {
                method: "POST",
                body: JSON.stringify({
                    rental: {
                        agency: this.state.agency,
                        item: this.state.item,
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
                this.props.createRentalEntry(data)
                console.log(data)
                console.log("Rental Created Successfully");
              })
              .catch((err) => alert(err));
          }
    }

    render(){
        return(
            <div>
                New Rental
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        required id="new-trip-input"
                        label="Agency" 
                        onChange={(e) => { this.setState({ agency: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="Item" 
                        onChange={(e) => { this.setState({ item: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="Rental Date"
                        type="date" 
                        defaultValue="2020-10-13"
                        onChange={(e) => { this.setState({ startDate: e.target.value }) }}
                    />
                    <br />
                    <TextField 
                        required id="new-trip-input"
                        label="Return Date" 
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
                        Create Rental
                    </Button>
                </form>
            </div>
        )
    }
}

export default NewRental;
