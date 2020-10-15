import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import NewTrip from './NewTrip';
import FetchTrips from './FetchTrips';


type AcceptedProps = {
    sessionToken: string
}

type iState ={
    tripList: tripObject[]
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

export default class TripManager extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            tripList: []
        }
    }

    readTripList: any = (list: tripObject[]) => {
        this.setState({ tripList: list })
        console.log(this.state.tripList)
        console.log('list updated')
    }

    createTripEntry: any = (entry: tripObject) => {
        this.setState({ tripList: [...this.state.tripList, entry] })
        console.log(this.state.tripList)
        console.log('trip added')
    }

    updateTripEntry: any = (oldTrip: tripObject, newTrip: tripObject) => {
        let copy = [...this.state.tripList]
        let index = this.state.tripList.indexOf(oldTrip)
        copy[index] = newTrip;
        this.setState({ tripList: copy })
        console.log('trip updated')
    } 

    deleteTripEntry: any = (trip: tripObject) => {
        let copy = [...this.state.tripList]
        let index = this.state.tripList.indexOf(trip)
        copy.splice(index, 1)
        this.setState({ tripList: copy })
        console.log('trip removed')
    } 

    render(){
        return(
            <div>
                <Container>
                    <NewTrip 
                        sessionToken={this.props.sessionToken} 
                        tripList={this.state.tripList}
                        createTripEntry={this.createTripEntry}
                    />
                </Container>
                <Container>
                    <FetchTrips 
                        sessionToken={this.props.sessionToken}
                        tripList={this.state.tripList}
                        readTripList={this.readTripList}
                        updateTripEntry={this.updateTripEntry}
                        deleteTripEntry={this.deleteTripEntry}
                    />
                </Container>
            </div>
        )
    }
}

