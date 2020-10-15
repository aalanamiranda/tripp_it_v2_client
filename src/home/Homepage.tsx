import React, { Component } from 'react';
import Navbar from './Navbar';
import TripManager from '../components/trip/TripManager';
import ActivityManager from '../components/activity/ActivityManager';
import RentalManager from '../components/rental/RentalManager'
import NewTrip from '../components/trip/NewTrip';
import FetchTrip from '../components/trip/FetchTrips';
import NewActivity from '../components/activity/NewActivity';
import FetchActivity from '../components/activity/FetchActivity';
import NewRental from '../components/rental/NewRental';
import FetchRental from '../components/rental/FetchRentals';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FetchActivities from '../components/activity/FetchActivity';
import ActivityCard from '../components/activity/ActivityCard';


type AcceptedProps = {
    sessionToken: string,
    clickLogout: any,
    firstName: string,
    lastName: string
}

/* type iState = {
    masterList: object[],
    tripList: object[],
    activityList: object[],
    rentalList: object[]
} */

class Homepage extends Component<AcceptedProps, {}>{
    constructor(props: AcceptedProps){
        super(props)
        /* this.state = {
            masterList: [],
            tripList: [],
            activityList: [],
            rentalList: []
        } */
    }

    /*addEntry: any = (entry: object) => {
        this.setState({ masterList: [...this.state.masterList, entry] })
        console.log('Entry Added')
    }
    
     updateEntry: any = (entry: object, newEntry: object) => {
        let copy = [...this.state.masterList]
        let index = this.state.masterList.indexOf(entry)
        copy[index] = newEntry
        this.setState({ masterList: copy })
        console.log('Entry Updated')
    }

    removeEntry: any = (entry: object) => {
        let copy = [...this.state.masterList]
        let index = this.state.masterList.indexOf(entry)
        copy.splice(index, 1)
        this.setState({ masterList: copy })
        console.log('Entry Removed')
    }

    updateTripList: any = (entry: object) => {
        this.setState({ tripList: [...this.state.tripList, entry] })
        this.addEntry(entry)
    }

    updateTripEntry: any = (entry: object, trip: object) => {
        this.state.tripList.splice(this.state.tripList.indexOf(trip), 1, entry)
        console.log('trip updated')
    } 

    updateActivityList: any = (entry: object) => {
        this.setState({ activityList: [...this.state.activityList, entry] })
        this.addEntry(entry)
    }

    updateRentalList: any = (entry: object) => {
        this.setState({ activityList: [...this.state.rentalList, entry] })
        this.addEntry(entry)
    } */

    render(){
        return(
            <div>
                <Navbar 
                    clickLogout={this.props.clickLogout} 
                    sessionToken={this.props.sessionToken}
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                />
                <Grid container spacing={1}>
                <Grid >
                    {/* <Container >
                        <NewTrip
                            masterList={this.state.masterList} 
                            addEntry={this.addEntry} 
                            sessionToken={this.props.sessionToken}
                        />
                        
                    </Container> */}
                    <Container>
                        <TripManager sessionToken={this.props.sessionToken}/>
                    {/*upcoming goes here */}
                    </Container>
                </Grid>
                <Grid > 
                    {/* <Container >
                        <FetchTrip 
                            masterList={this.state.masterList} 
                            sessionToken={this.props.sessionToken} 
                            addEntry={this.addEntry}
                        />
                    </Container> */}
                    <Container>
                        <ActivityManager sessionToken={this.props.sessionToken}/>
                    </Container>
                </Grid>
                <Grid > 
                    {/* <Container >
                        <FetchTrip 
                            masterList={this.state.masterList} 
                            sessionToken={this.props.sessionToken} 
                            addEntry={this.addEntry}
                        />
                    </Container> */}
                    <Container>
                        <RentalManager sessionToken={this.props.sessionToken}/>
                    </Container>
                </Grid>
                </Grid>
            </div>
        )
    }
}

export default Homepage;