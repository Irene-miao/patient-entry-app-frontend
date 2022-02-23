/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { State } from "./state";
import { Diagnosis,  Patient} from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "REMOVE_PATIENT";
      payload: string;
    }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  console.log("State: ", state);
  console.log("Action: ", action);

    switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        } 
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "REMOVE_PATIENT":
        delete state.patients[action.payload];
      return {
        ...state,
        patients: state.patients
      };
      case "ADD_ENTRY":
        
        return {
          ...state, 
          patients: {
            ...state.patients,
            [action.payload.id]: state.patients[action.payload.id] = action.payload
          }
        };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          } 
        };
    default:
      return state;
  }
  
};



export const setPatientList = (patients: Patient[]): Action => {
  return {
      type: 'SET_PATIENT_LIST',
      payload: patients, 
    };
  };

  export const addPatient = (newPatient: Patient): Action => {
    return {
       type: "ADD_PATIENT", 
      payload: newPatient,
    };
  };


  export const addEntry = (newEntry: Patient):Action => {
    console.log(newEntry);
    return {
      type: "ADD_ENTRY",
      payload: newEntry,
    };
  };

  export const removePatient = (id: string): Action => {
    console.log(id);
    return {
      type: "REMOVE_PATIENT",
      payload: id,
    };
  };

  export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
    return {
        type: 'SET_DIAGNOSIS_LIST',
        payload: diagnoses, 
      };
    };