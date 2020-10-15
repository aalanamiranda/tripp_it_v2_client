import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import NewActivity from './NewActivity';
import FetchActivity from './FetchActivity';


type AcceptedProps = {
    sessionToken: string
}

type iState ={
    activityList: activityObject[]
}

interface activityObject {
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    description: string | null
}

export default class ActivityManager extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            activityList: []
        }
    }

    readActivityList: any = (list: activityObject[]) => {
        this.setState({ activityList: list })
        console.log(this.state.activityList)
        console.log('list updated')
    }

    createActivityEntry: any = (entry: activityObject) => {
        this.setState({ activityList: [...this.state.activityList, entry] })
        console.log(this.state.activityList)
        console.log('activity added')
    }

    updateActivityEntry: any = (oldActivity: activityObject, newActivity: activityObject) => {
        let copy = [...this.state.activityList]
        let index = this.state.activityList.indexOf(oldActivity)
        copy[index] = newActivity;
        this.setState({ activityList: copy })
        console.log('activity updated')
    } 

    deleteActivityEntry: any = (activity: activityObject) => {
        let copy = [...this.state.activityList]
        let index = this.state.activityList.indexOf(activity)
        copy.splice(index, 1)
        this.setState({ activityList: copy })
        console.log('activity removed')
    } 

    render(){
        return(
            <div>
                <Container>
                    <NewActivity 
                        sessionToken={this.props.sessionToken} 
                        activityList={this.state.activityList}
                        createActivityEntry={this.createActivityEntry}
                    />
                </Container>
                <Container>
                    <FetchActivity 
                        sessionToken={this.props.sessionToken}
                        activityList={this.state.activityList}
                        readActivityList={this.readActivityList}
                        updateActivityEntry={this.updateActivityEntry}
                        deleteActivityEntry={this.deleteActivityEntry}
                    />
                </Container>
            </div>
        )
    }
}