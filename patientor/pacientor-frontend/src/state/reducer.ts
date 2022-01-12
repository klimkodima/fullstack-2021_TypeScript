import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |  {
      type: "FIND_BY_ID";
      payload: Patient;
    }
  |  {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[];
  }
  |  {
    type: "ADD_ENTRY";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
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
      case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnoses: {
          ...action.payload
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
      case "FIND_BY_ID":
      return {
        ...state,
        patient: action.payload

      };
      case "ADD_ENTRY":
      return {
        ...state,
        patient: action.payload

      };
    default:
      return state;
  }
};

export const addPatient = (patient:Patient) : Action => {
  return {
    type:"ADD_PATIENT",
    payload:patient
  };
};

export const setPatient = (patient:Patient) : Action => {
  return {
    type:"FIND_BY_ID",
    payload:patient
  };
};

export const addEntry = (patient:Patient) : Action => {

  return {
    type:"ADD_ENTRY",
    payload:patient
  };
};

export const setPatientList = (patientList:Patient[]) : Action => {
  return { 
    type: "SET_PATIENT_LIST",
     payload: patientList
    };
};

export const setDiagnosis = (diagnosisList:Diagnosis[]) : Action => {
  return { 
    type: "SET_DIAGNOSIS",
     payload: diagnosisList
    };
};
