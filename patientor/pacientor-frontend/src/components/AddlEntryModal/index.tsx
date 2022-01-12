import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import EntryForm from './EntryForm';
import { EntryWithoutId } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <EntryForm onSubmit={onSubmit}  onCancel={onClose} /> 
      </Modal.Content>
   </Modal>
  );
};
export default AddEntryModal;