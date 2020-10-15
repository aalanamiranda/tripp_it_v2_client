import React, { Component } from 'react';
import APIURL from "../../helpers/environment";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface rentalObject {
  id: number,
  agency: string,
  item: string,
  startDate: string,
  endDate: string,
  description: string | null
}

type AcceptedProps = {
  rentalList: rentalObject[],
  fetchRentals: any,
  sessionToken: string,
  updateRentalEntry: any,
  deleteRentalEntry: any
}

type iState = {
  agency: string,
  item: string,
  startDate: string,
  endDate: string,
  description: string | null
}



class RentalCard extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
          agency: '',
          item: '',
          startDate: '',
          endDate: '',
          description: null
        }
    }

    editRental: any = (event: any, rental: rentalObject) => {
      console.log(this.state)
        fetch(`${APIURL}/rental/${rental.id}`, {
          method: "PUT",
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
            Authorization: this.props.sessionToken,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.props.updateRentalEntry(data)
            this.props.fetchRentals();
          })
          .catch((err) => console.log(err));
      };

      deleteRental: any = (event: any, rental: rentalObject) => {
        fetch(`${APIURL}/rental/${rental.id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          }),
        })
          .then((res) => res.json())
          .then((rentalsData) => {
            console.log(rentalsData);
            this.props.deleteRentalEntry();
            this.props.fetchRentals();
          })
          .catch((err) => console.log(err));
      };
    

    render(){
        return(
            <div>
              {
                this.props.rentalList.map((rental: rentalObject)=>{
                  return(
                    <div key={rental.id}>
                        <Card>
                            <CardContent>
                            <Typography >
                                Agency: {rental.agency}
                            </Typography>
                            <TextField 
                              required id="new-trip-input"
                              label="Agency" 
                              onChange={(e) => { this.setState({ agency: e.target.value })  }}
                            />
                            <Typography >
                                Item: {rental.agency}
                            </Typography>
                            <TextField 
                              required id="new-trip-input"
                              label="Item" 
                              onChange={(e) => { this.setState({ item: e.target.value })  }}
                            />
                            <Typography >
                                Pick up: {new Date(rental.startDate).toString().substring(0,16)} 
                            </Typography>
                            <TextField 
                                required id="new-trip-input"
                                label="Pick Up Date"
                                type="date" 
                                defaultValue="2020-10-13"
                                onChange={(e) => { this.setState({ startDate: e.target.value }) }}
                            />
                            <Typography >
                                Return: {new Date(rental.endDate).toString().substring(0,16)}
                            </Typography>
                            <TextField 
                                required id="new-trip-input"
                                label="Return Date" 
                                type="date"
                                defaultValue="2020-10-13"
                                onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                            />
                            {
                              rental.description !== null ?
                              <Typography >
                                Notes: {rental.description}
                              </Typography> :
                              null
                            }
                            <TextField 
                                id="new-trip-input"
                                label="Notes" 
                                onChange={(e) => { this.setState({ description: e.target.value }) }}
                            />
                            </CardContent>
                            <CardActions>
                            <Button onClick={(e) =>this.editRental(e, rental)} size="small">Edit</Button>
                            </CardActions>
                            <CardActions>
                            <Button onClick={(e) =>this.deleteRental(e, rental)} size="small">Delete</Button>
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

export default RentalCard