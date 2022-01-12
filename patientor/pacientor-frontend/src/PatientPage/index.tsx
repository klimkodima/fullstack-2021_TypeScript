import React from "react";
import { Card, Icon, Button } from 'semantic-ui-react';
import { useStateValue, addEntry } from "../state";
import { Patient } from "../types";
import EntryItem from "../components/EntryItem";
import AddEntryModal from "../components/AddlEntryModal";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { EntryWithoutId } from "../types";

const PatientPage = () => {

  const [{ patient }, dispatch] = useStateValue();
  const [entryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => {
        setEntryModalOpen(true);   
  };
  const closeModal = (): void => {
    setEntryModalOpen(false);  
    setError(undefined);
  };

  const submitNewEntry = async ( values: EntryWithoutId) => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data: chengedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patient?.id}/entries`, values);
      dispatch(addEntry(chengedPatient));
      closeModal();
    } catch (e) {
      setError(e.response?.data?.error || 'Unknown error');
    }
  };
  
  if(patient === null) return null;

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header>{patient.name} <GenderIcon gender={patient.gender}/></Card.Header>
            <Card.Content>
              <p>ssn: {patient.ssn}</p>
              <p>occupation: {patient.occupation}</p>
            </Card.Content>
            <Card.Content>
              <h3>entries</h3>
              { patient.entries.map( entry => 
                <EntryItem key={entry.id} entry={entry}/>
              ) }
            </Card.Content>
        </Card.Content>    
      </Card>
      <AddEntryModal
        modalOpen={entryModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
       <Button onClick={() => openModal()}>Add New Entry</Button>
    </> 
  );
};

const GenderIcon = ({ gender}: {gender:Patient['gender']}) => {
  switch (gender)  {
    case 'male':
      return <Icon name='mars'/>;
      break;
    case 'female':
      return <Icon name='venus'/>;
      break;
    case 'other':
      return <Icon name='genderless'/>;
      break;
    default:
      return null;  
  }
};

export default PatientPage;