import patients from  '../../data/patients';
import {  PublicPatient, Patient, NewPatientEntry, EntryWithoutId } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = (): Array<Patient> => {
  return patients;
};

const findById = (id:string): Patient | undefined => {
  const patient =  patients.find(patient => patient.id === id);
  return patient;
};

const getNonSensitivePatientEntries = (): Array<PublicPatient> =>  {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry:NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry:EntryWithoutId): Patient | undefined => {
  const patient =  patients.find(patient => patient.id === id);
  const newEntry = {
    id: uuid(),
    ...entry
  };
    patient?.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientEntries,
  findById,
  addEntry
};