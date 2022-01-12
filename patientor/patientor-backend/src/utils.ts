import { NewPatientEntry, EntryWithoutId, Gender, DiagnoseEntry, HealthCheckRating } from './types';
import diagnoses from  './../data/diagnoses';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error(`Incorrect or missing ${comment}`);
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, ssn: unknown, occupation: unknown };

export  const toNewPatientEntry = ( { name, dateOfBirth, gender, occupation, ssn } : Fields): NewPatientEntry => {
  const newPatientEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseString(ssn),
    occupation: parseString(occupation),
    entries:[]
  };
  return newPatientEntry;
};

type EntryFields = { description: unknown, type: unknown, date: unknown, specialist: unknown,
  diagnosisCodes: unknown, healthCheckRating: unknown, dischargeDate: unknown, criteria: unknown,
   employerName: unknown, endDate:unknown, startDate:unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnoseCode = (param: any): param is Array<DiagnoseEntry['code']> => {
    return diagnoses.every((e)=>param.includes(e));
};

const parseCodes = (codes: unknown): Array<DiagnoseEntry['code']> => {
  if (!codes || !isDiagnoseCode(codes)) {
    return [];
  }
  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
 const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (parseHealthCheckRating: unknown): HealthCheckRating => {
  if (!parseHealthCheckRating || !isHealthCheckRating(parseHealthCheckRating) ) {
    throw new Error('Incorrect or missinghealthCheckRating: ' + parseHealthCheckRating);
  }
  return parseHealthCheckRating;
}

const parseSickLeave = (startDate: any, endDate: any) : { startDate: string, endDate : string} => {
  let value = {
    startDate: "",
    endDate: ""
  }
  value.startDate = parseDate(startDate);
  value.endDate = parseDate(endDate);
  return value;
}

const parseDischarge = (dischargeDate:any, criteria: any) : {date:string, criteria:string} => {
  let value = {
    date: "",
    criteria: ""
  }
  value.date = parseDate(dischargeDate);
  value.criteria = parseString(criteria);
  return value;
}

let newEntry: EntryWithoutId;

export const toNewEntry = ({
  description, type, date, specialist, diagnosisCodes, healthCheckRating, dischargeDate, criteria, employerName, startDate, endDate } : EntryFields): EntryWithoutId    => {
    switch(parseString(type)) {
    case 'Hospital':
      newEntry = {
        description: parseString(description),
        type: 'Hospital',
        date: parseDate(date),
        specialist: parseString(specialist),
        diagnosisCodes: parseCodes(diagnosisCodes),
        discharge: parseDischarge(dischargeDate, criteria)
      };
      break;
     
    case 'HealthCheck':
      newEntry = {
        description: parseString(description),
        type: 'HealthCheck',
        date: parseDate(date),
        specialist: parseString(specialist),
        diagnosisCodes: parseCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating( healthCheckRating)
      };
      break;
    
    case 'OccupationalHealthcare':
       newEntry = {
        description: parseString(description),
        type: 'OccupationalHealthcare',
        date: parseDate(date),
        specialist: parseString(specialist),
        diagnosisCodes: parseCodes(diagnosisCodes),
        employerName: parseString(employerName),
        sickLeave: parseSickLeave(startDate, endDate)
      };
  }
  return newEntry;
};