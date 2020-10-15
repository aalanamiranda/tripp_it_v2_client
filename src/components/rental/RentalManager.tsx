import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import NewRental from './NewRental';
import FetchRentals from './FetchRentals';


type AcceptedProps = {
    sessionToken: string
}

type iState ={
    rentalList: rentalObject[]
}

interface rentalObject {
    id: number,
    agency: string,
    item: string,
    startDate: string,
    endDate: string,
    description: string | null
  }

export default class RentalManager extends Component<AcceptedProps, iState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            rentalList: []
        }
    }

    readRentalList: any = (list: rentalObject[]) => {
        this.setState({ rentalList: list })
        console.log(this.state.rentalList)
        console.log('list updated')
    }

    createRentalEntry: any = (entry: rentalObject) => {
        this.setState({ rentalList: [...this.state.rentalList, entry] })
        console.log(this.state.rentalList)
        console.log('rental added')
    }

    updateRentalEntry: any = (oldRental: rentalObject, newRental: rentalObject) => {
        let copy = [...this.state.rentalList]
        let index = this.state.rentalList.indexOf(oldRental)
        copy[index] = newRental;
        this.setState({ rentalList: copy })
        console.log('rental updated')
    } 

    deleteRentalEntry: any = (rental: rentalObject) => {
        let copy = [...this.state.rentalList]
        let index = this.state.rentalList.indexOf(rental)
        copy.splice(index, 1)
        this.setState({ rentalList: copy })
        console.log('rental removed')
    } 

    render(){
        return(
            <div>
                <Container>
                    <NewRental 
                        sessionToken={this.props.sessionToken} 
                        rentalList={this.state.rentalList}
                        createRentalEntry={this.createRentalEntry}
                    />
                </Container>
                <Container>
                    <FetchRentals 
                        sessionToken={this.props.sessionToken}
                        rentalList={this.state.rentalList}
                        readRentalList={this.readRentalList}
                        updateRentalEntry={this.updateRentalEntry}
                        deleteRentalEntry={this.deleteRentalEntry}
                    />
                </Container>
            </div>
        )
    }
}

