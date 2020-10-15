import React, { Component, FormEvent } from 'react';
import APIURL from "../../helpers/environment";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type AcceptedProps = {
    tripList: tripObject[],
    sessionToken: string,
    fetchTrips: any,
    updateTripEntry: any,
    deleteTripEntry: any
}

interface tripObject {
  id: number,
  title: string,
  departLoc: string,
  arrivalLoc: string,
  startDate: string,
  endDate: string,
  travelMethod: string | null,
  reason: string | null,
  description: string | null
}

type iState = {
  title: string,
  departLoc: string,
  arrivalLoc: string,
  startDate: string,
  endDate: string,
  travelMethod: string | null,
  reason: string | null,
  description: string | null
}

class TripCard extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
          title: '',
          departLoc: '',
          arrivalLoc: '',
          startDate: '',
          endDate: '',
          travelMethod: null,
          reason: null,
          description: null
        }
    }

    editTrip: any = (event: any, trip: tripObject) => {
        console.log(this.state)
        fetch(`${APIURL}/trip/${trip.id}`, {
          method: "PUT",
          body: JSON.stringify({
            trip: {
                title: this.state.title,
                departLoc: this.state.departLoc,
                arrivalLoc: this.state.arrivalLoc,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                travelMethod: this.state.travelMethod,
                reason: this.state.reason,
                description: this.state.description
            },
          }),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.props.updateTripEntry(data);
            this.props.fetchTrips();
          })
          .catch((err) => console.log(err));
      };

      deleteTrip: any = (event: any, trip: tripObject) => {
        fetch(`${APIURL}/trip/${trip.id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          }),
        })
          .then((res) => res.json())
          .then((tripsData) => {
            console.log(tripsData);
            this.props.deleteTripEntry();
            this.props.fetchTrips();
          })
          .catch((err) => console.log(err));
      };
    

    render(){
        return(
            <div>
                {
                  this.props.tripList.map((trip: tripObject) => {
                      return(
                        <div key={trip.id}>
                          <Card>
                            <CardContent>
                            <Typography >
                                Title: {trip.title}
                            </Typography>
                            <TextField 
                              required id="new-trip-input"
                              label="Title" 
                              onChange={(e) => { this.setState({ title: e.target.value })  }}
                            />
                            <Typography >
                                Departing from {new Date(trip.startDate).toString().substring(0,16)} to {trip.departLoc} 
                            </Typography>
                            <TextField 
                                required id="new-trip-input"
                                label="Departure Date"
                                type="date" 
                                defaultValue="2020-10-13"
                                onChange={(e) => { this.setState({ startDate: e.target.value }) }}
                            />
                            <TextField 
                                required id="new-trip-input"
                                label="From" 
                                onChange={(e) => { this.setState({ departLoc: e.target.value }) }}
                            />
                            <Typography >
                                Arriving {new Date(trip.endDate).toString().substring(0,16)} to {trip.arrivalLoc}
                            </Typography>
                            <TextField 
                                required id="new-trip-input"
                                label="Arrival Date" 
                                type="date"
                                defaultValue="2020-10-13"
                                onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                            />
                            <TextField 
                                required id="new-trip-input"
                                label="To"
                                onChange={(e) => { this.setState({ arrivalLoc: e.target.value }) }} 
                            />
                            {
                              trip.travelMethod !== null ?
                              <Typography >
                                Method of Travel: {trip.travelMethod}
                              </Typography> :
                              null
                            }
                            <TextField 
                                id="new-trip-input"
                                label="Method of Travel" 
                                onChange={(e) => { this.setState({ travelMethod: e.target.value }) }}
                            />
                            {
                              trip.reason !== null ?
                              <Typography >
                                Trip Reason: {trip.reason}
                              </Typography> :
                              null
                            }
                            <TextField 
                                id="new-trip-input"
                                label="Reason for Travel" 
                                onChange={(e) => { this.setState({ reason: e.target.value }) }}
                            />
                            {
                              trip.description !== null ?
                              <Typography >
                                Notes: {trip.description}
                              </Typography> :
                              null
                            }
                            <TextField 
                                id="new-trip-input"
                                label="Description" 
                                onChange={(e) => { this.setState({ description: e.target.value }) }}
                            />
                            </CardContent>
                            <CardActions>
                            <Button onClick={(e) =>this.editTrip(e, trip)} size="small">Edit</Button>
                            </CardActions>
                            <CardActions>
                            <Button onClick={(e) =>this.deleteTrip(e, trip)} size="small">Delete</Button>
                            </CardActions>
                          </Card>
                        </div>
                      )
                  })
                }
            </div>
        )
    }
}

export default TripCard