import React from 'react';
import { HealthCheckEntry } from "../types";
import { Icon, Card } from "semantic-ui-react";


interface HealthDetail {
    health: HealthCheckEntry;
}


const HealthCheck = (props: HealthDetail) => {
   console.log(props.health);
    if (!props.health) {
        return null;
    }
    
    return (
             <div>
                <Card fluid centered style={{padding: 10, margin: 10}}>
                <p>{props.health.date} <Icon fitted name='doctor' size='huge' />{props.health.specialist}</p>
                    <p>{props.health.description}</p>
                    <p>{props.health.healthCheckRating < 2 ? <Icon color='red' fitted name='heart'/> : <Icon color='yellow' fitted name='heart' />}</p>
                </Card>
        </div>
     
    );
};

export default HealthCheck;
