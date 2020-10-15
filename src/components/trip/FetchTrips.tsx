import React, {Component} from 'react';
import APIURL from "../../helpers/environment";
import Container from '@material-ui/core/Container';
import TripCard from './TripCard';

interface tripObject {
    id: number,
    title: string,
    departLoc: string,
    arrivalLoc: string,
    startDate: string,
    endDate: string,
    travelMethod: string | null,
    reason: string | null ,
    description: string | null
}

type AcceptedProps = {
    sessionToken: string,
    tripList: tripObject[],
    readTripList: any, 
    updateTripEntry: any,
    deleteTripEntry: any
}

type iState = {
    prevTripListState: object[],
    newTripListState: object[]
}

class FetchTrips extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            prevTripListState: [],
            newTripListState: this.props.tripList
        }
    }
    
    fetchTrips = () => {
        fetch(`${APIURL}/trip/`, {
            method: "GET",
            headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
            }),
        })
            .then((res) => res.json())
            .then((tripsData) => {
                console.log(tripsData);
                this.setState({ prevTripListState: this.state.newTripListState })
                this.setState({ newTripListState: this.props.tripList })
                this.props.readTripList(tripsData)
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.fetchTrips()
    }

    /* componentDidUpdate(){
        if(this.state.newTripListState !== this.state.prevTripListState){
            this.setState({ prevTripListState: this.state.newTripListState })
            this.setState({ newTripListState: this.props.tripList })
        }
    } */

    render(){
        return(
            <div>
                <Container>
                    <TripCard 
                        tripList={this.props.tripList}
                        sessionToken={this.props.sessionToken}
                        fetchTrips={this.fetchTrips} 
                        updateTripEntry={this.props.updateTripEntry}
                        deleteTripEntry={this.props.deleteTripEntry}
                    />
                </Container>
            </div>
        )
    }
}

export default FetchTrips;