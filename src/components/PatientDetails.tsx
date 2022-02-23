import React from 'react';
import { useStateValue, addEntry } from "../state";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { Icon, Button} from "semantic-ui-react";
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalEntry from './OccupationalEntry';
import axios from "axios";
import {EntryFormValues} from "../types";

import AddEntryModal from "../AddEntryModal";

import { apiBaseUrl } from "../constants";



const PatientDetails = () => {
    const [{ patients, diagnoses}, dispatch] = useStateValue();

    const {id} = useParams();
    
    console.log(patients);
    console.log(diagnoses);

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  
  const submitNewEntry = (values: EntryFormValues) => {
    console.log(values);
    Object.values(patients).map(async (patient: Patient) => {
      if (patient.id === id) {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/${id}/entries`,
            values
          );
          console.log(newEntry);
          const editPatient = patient.entries.concat(newEntry);
          console.log(editPatient);
          dispatch(addEntry(patient));
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setError(e.response?.data || 'Unknown Error');
        }
      }
    }); 
  };

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
        console.log(entry);
        
        switch (entry.type) {
            case "Hospital":
                return <Hospital   hospital={entry}/>;
            case "OccupationalHealthcare":
                return <OccupationalEntry occupational={entry}/>;
            case "HealthCheck":
                return <HealthCheck  health={entry}/>;
            default:
                return assertNever(entry);
        }
    };

    return (
        <div>
            {Object.values(patients).map((patient: Patient) => (
            patient.id === id ? 
           ( 
           <div key={patient.id}> 
                <h1>{patient.name}  {patient.gender === "male" ? <Icon fitted name='mars'/> : <Icon fitted name='venus' />}</h1>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
              
                <h3>entries</h3>
                <div>
                <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
                <div>
                {Object.values(patient.entries)?.map((entry: Entry) => { 
                    console.log(entry);
                    return EntryDetails({entry}
                    );})}
                </div>
        </div>
            ) : null ))}
        </div> 
    );
           };

export default PatientDetails;
