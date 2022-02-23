import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Icon, Card } from 'semantic-ui-react';


interface OccupationalDetail {
    occupational: OccupationalHealthcareEntry
}

const OccupationalEntry = (props: OccupationalDetail) => {
    console.log(props.occupational);
    if (!props.occupational) {
        return null;
    }
    
    return (
        <div >
            <Card fluid centered style={{padding: 10, margin: 10}}>
            <p>{props.occupational.date} <Icon fitted name='stethoscope' size='huge' /> {props.occupational.specialist}</p>
            <p>{props.occupational.description}</p>
            <p>{props.occupational.employerName}</p>
            {props.occupational.sickLeave ? <p>Start: {props.occupational.sickLeave.startDate}<br />End: {props.occupational.sickLeave.endDate}</p> : null}
            </Card>
        </div>
    );
};

export default OccupationalEntry;
