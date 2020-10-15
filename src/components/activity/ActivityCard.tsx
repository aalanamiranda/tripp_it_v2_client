import React, { Component } from 'react';
import APIURL from "../../helpers/environment";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type AcceptedProps = {
    activityList: activityObject[],
    fetchActivities: any,
    sessionToken: string,
    updateActivityEntry: any,
    deleteActivityEntry: any
}

interface activityObject {
  id: number,
  title: string,
  startDate: string,
  endDate: string,
  description: string | null
}

type iState = {
  title: string,
  startDate: string,
  endDate: string,
  description: string | null
}

class ActivityCard extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
          title: '',
          startDate: '',
          endDate: '',
          description: null
        }
    }

    editActivity = (event: any, activity: activityObject) => {
        fetch(`${APIURL}/activity/${activity.id}`, {
          method: "PUT",
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
            Authorization: this.props.sessionToken,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.props.updateActivityEntry(data)
            this.props.fetchActivities();
          })
          .catch((err) => console.log(err));
      };

      deleteActivity = (event: any, activity: activityObject) => {
        fetch(`${APIURL}/activity/${activity.id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          }),
        })
          .then((res) => res.json())
          .then((activitysData) => {
            console.log(activitysData);
            this.props.deleteActivityEntry()
            this.props.fetchActivities();
          })
          .catch((err) => console.log(err));
      };
    

    render(){
        return(
            <div>
              {
                this.props.activityList.map((activity: activityObject) => {
                  return(
                    <div key={activity.id}>
                      <Card>
                        <CardContent>
                        <Typography >
                                  Title: {activity.title}
                              </Typography>
                              <TextField 
                                required id="new-activity-input"
                                label="Title" 
                                onChange={(e) => { this.setState({ title: e.target.value })  }}
                              />
                              <Typography >
                                  Departing from {new Date(activity.startDate).toString().substring(0,16)} 
                              </Typography>
                              <TextField 
                                  required id="new-activity-input"
                                  label="Departure Date"
                                  type="date" 
                                  defaultValue="2020-10-13"
                                  onChange={(e) => { this.setState({ startDate: e.target.value }) }}
                              />
                              <Typography >
                                  Arriving {new Date(activity.endDate).toString().substring(0,16)}
                              </Typography>
                              <TextField 
                                  required id="new-activity-input"
                                  label="Arrival Date" 
                                  type="date"
                                  defaultValue="2020-10-13"
                                  onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                              />
                              {
                                activity.description !== null ?
                                <Typography >
                                  Notes: {activity.description}
                                </Typography> :
                                null
                              }
                              <TextField 
                                  id="new-activity-input"
                                  label="Description" 
                                  onChange={(e) => { this.setState({ description: e.target.value }) }}
                              />
                              </CardContent>
                              <CardActions>
                              <Button onClick={(e) =>this.editActivity(e, activity)} size="small">Edit</Button>
                              </CardActions>
                              <CardActions>
                              <Button onClick={(e) =>this.deleteActivity(e, activity)} size="small">Delete</Button>
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

export default ActivityCard