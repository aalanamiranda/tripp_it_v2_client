import React, {Component} from 'react';
import APIURL from "../../helpers/environment";
import Container from '@material-ui/core/Container';
import ActivityCard from './ActivityCard';

interface activityObject {
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    description: string | null
}

type AcceptedProps = {
    sessionToken: string,
    activityList: activityObject[],
    readActivityList: any,
    updateActivityEntry: any,
    deleteActivityEntry: any
}

type iState = {
    prevActivityListState: object[],
    newActivityListState: object[]
}

class FetchActivities extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            prevActivityListState: [],
            newActivityListState: this.props.activityList
        }
    }
    
    fetchActivities = () => {
        fetch(`${APIURL}/activity/`, {
            method: "GET",
            headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
            }),
        })
            .then((res) => res.json())
            .then((activityData) => {
                console.log(activityData);
                this.setState({ prevActivityListState: this.state.newActivityListState });
                this.setState({ newActivityListState: this.props.activityList });
                this.props.readActivityList(activityData)
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.fetchActivities();
    }

    /* componentDidUpdate(){
        if(this.state.newActivityListState !== this.state.prevActivityListState){
            this.setState({ prevActivityListState: this.state.newActivityListState })
            this.setState({ newActivityListState: this.props.activityList })
        }
    } */

    render(){
        return(
            <div>
               <Container>
                   <ActivityCard 
                        activityList={this.props.activityList}
                        sessionToken={this.props.sessionToken}
                        fetchActivities={this.fetchActivities}
                        updateActivityEntry={this.props.updateActivityEntry}
                        deleteActivityEntry={this.props.deleteActivityEntry}
                   />
               </Container>
            </div>
        )
    }
}

export default FetchActivities;