import React from "react";
import { Entry, Diagnosis, HospitalEntry, HealthCheckEntry, OccupationalHealthCareEntry} from "../types";
import { useStateValue } from ".././state";
import { Card, Icon } from 'semantic-ui-react';


const EntryItem = ({entry}:{entry: Entry} ) => {
  const [{ diagnoses }] = useStateValue();
  switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryItem entry={entry}/>;
      case 'HealthCheck':
        return <HealthCheckEntryItem entry={entry}/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcare entry={entry}/>;
      default:
        return <AssertNever entry={entry} diagnoses={diagnoses}/>;
  }
};

const AssertNever = ({entry, diagnoses}:{entry: Entry, diagnoses:  Diagnosis[]} ) => {
  return(
    <Card fluid>
      <Card.Content>
        {entry.date}<i>{entry.description}</i>
      </Card.Content>
      <Card.Content>
        <ul>
          { entry.diagnosisCodes && entry.diagnosisCodes.map( code => {
             const diadnose = Object.values(diagnoses).find(d => d.code === code);
             return (<li key={code}>{code} {diadnose && diadnose.name}</li>);
          }
          ) }
        </ul>
      </Card.Content>  
    </Card>
  );
};

const HospitalEntryItem = ({entry}:{entry: HospitalEntry} ) => {
    return(
      <Card fluid>
        <Card.Content>
          <Card.Header>{entry.date} <Icon size='large' name='hospital'/></Card.Header>
          <Card.Content>
          <i>{entry.description}</i>
          </Card.Content>
          <Card.Content>
          </Card.Content>
      </Card.Content>    
    </Card>
    );
};

const HealthCheckEntryItem = ({ entry }:{ entry:  HealthCheckEntry }) => {

    const checkColor = (healthCheckRating: number | undefined) => {
      switch(healthCheckRating) {
        case 0:
          return 'green';
        case 1:
          return 'yellow';
        case 2:
          return 'orange';
        case 3:
          return 'red';
        default:
          return 'red';

      }
    };

    return(
        <Card fluid>
          <Card.Content>
            <Card.Header>{entry.date} <Icon size='large' name='user md'/></Card.Header>
            <Card.Content>
            <i>{entry.description}</i>
            </Card.Content>
            <Card.Content>
              <Icon name='heart' color={checkColor(entry.healthCheckRating)}/>
            </Card.Content>
        </Card.Content>    
      </Card>
      );
};

const OccupationalHealthcare = ({ entry }:{ entry:  OccupationalHealthCareEntry } ) => {
    return(
        <Card fluid>
          <Card.Content>
            <Card.Header>{entry.date} <Icon size='large' name='stethoscope'/>{entry.employerName}</Card.Header>
            <Card.Content>
            <i>{entry.description}</i>
            </Card.Content>
            <Card.Content>
            </Card.Content>
        </Card.Content>    
      </Card>
      );
};

   

export default EntryItem;