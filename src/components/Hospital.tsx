import * as React from 'react';
import {  HospitalEntry } from '../types';
import { Icon, Card } from 'semantic-ui-react';


interface HospitalDetail {
    hospital: HospitalEntry
}

const Hospital = (props : HospitalDetail) => {
console.log(props.hospital);
 if (!props.hospital) {
     return null;
 }


    return (
        <div>
            <Card fluid centered style={{padding: 10, margin:10}}>
            <p>{props.hospital.date} <Icon fitted name='doctor' size='huge' />{props.hospital.specialist}</p>
            <p>{props.hospital.description}</p>
            <p>{Object.values(props.hospital.discharge).join('  discharged:   ')}</p>
            </Card>
        </div>
    );
};

export default Hospital;
