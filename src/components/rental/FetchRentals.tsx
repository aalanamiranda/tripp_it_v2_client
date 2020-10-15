import { Container } from '@material-ui/core';
import React, {Component} from 'react';
import APIURL from "../../helpers/environment";
import RentalCard from './RentalCard';

interface rentalObject {
    id: number,
    agency: string,
    item: string,
    startDate: string,
    endDate: string,
    description: string | null
  }

type AcceptedProps = {
    sessionToken: string,
    rentalList: rentalObject[],
    readRentalList: any,
    updateRentalEntry: any,
    deleteRentalEntry: any
}

type iState = {
    prevRentalListState: object[],
    newRentalListState: object[]
}

class FetchRentals extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            prevRentalListState: [],
            newRentalListState: this.props.rentalList
        }
    }
    
    fetchRentals = () => {
        fetch(`${APIURL}/rental/`, {
            method: "GET",
            headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
            }),
        })
            .then((res) => res.json())
            .then((rentalData) => {
                console.log(rentalData);
                this.setState({ prevRentalListState: this.state.newRentalListState })
                this.setState({ newRentalListState: this.props.rentalList })
                this.props.readRentalList(rentalData)
                
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.fetchRentals()
    }

    render(){
        return(
            <div>
               <Container>
                    <RentalCard 
                        rentalList={this.props.rentalList}
                        sessionToken={this.props.sessionToken}
                        fetchRentals={this.fetchRentals}
                        updateRentalEntry={this.props.updateRentalEntry}
                        deleteRentalEntry={this.props.deleteRentalEntry}
                    />    
               </Container>
            </div>
        )
    }
}

export default FetchRentals;