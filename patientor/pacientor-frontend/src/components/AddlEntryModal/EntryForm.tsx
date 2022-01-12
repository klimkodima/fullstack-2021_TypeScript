import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../../state";
import { TextField, DiagnosisSelection, NumberField, TypeOption, SelectFieldTypes } from "./FormField";
import { EntryWithoutId, Type } from '../../types';
import { isDate } from '../../utils';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value:  Type.Hospital, label: "Hospital" },
  { value:  Type.HealthCheck, label: "HealthCheck" },
  { value:  Type.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

interface NestedErrorField {
  [field: string]: string;
}

export const EntryForm = ({ onCancel, onSubmit } : Props ) => {
  
  const [{ diagnoses }] = useStateValue();
  const [formType, setFormType] = useState(Type.Hospital);

  const onChangeType  = (event:React.ChangeEvent<HTMLInputElement>) => {
    
    switch (event.target.value) {
      case 'Hospital':
        setFormType(Type.Hospital);
        break;
      case 'HealthCheck':
        setFormType(Type.HealthCheck);
        break;
      case 'OccupationalHealthcare':
        setFormType(Type.OccupationalHealthcare);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        type: formType,
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        employerName: "",
        healthCheckRating: 0,
        discharge: {
          date: "",
          criteria: ""
       },
       sickLeave: {
        startDate: "",
        endDate: ""
      }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const malformattedError = 'Incorrect ';
        const errors: { [field: string]: string | NestedErrorField }  = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !isDate(values.date)) {
          errors.date = malformattedError + `date YYYY-MM-DD`;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'Hospital') {
          const discharge: NestedErrorField = {};
          const date = values.discharge?.date;
          const criteria = values.discharge?.criteria;

          if (!date) {
            discharge.date = requiredError;
            errors.discharge = discharge;
          } 

          if (!criteria) {
            discharge.criteria = requiredError;
            errors.discharge = discharge;
          }

          if (date && !isDate(date)) {
            discharge.date = malformattedError + `date YYYY-MM-DD`;
            errors.discharge = discharge;
          }
        }
       
        if (values.type === 'HealthCheck') {
          const rating = values?.healthCheckRating;

          if (!rating) {
            errors.healthCheckRating = 'Invalid or missing Health Check Rating';
          } else if (rating < 0 || rating > 3) {
            errors.healthCheckRating = 'Health check rating must be between 0-3'; 
          }
        }
        if (values.type === 'OccupationalHealthcare') {
          const sickLeave: NestedErrorField = {};
          const startDate = values.sickLeave?.startDate;
          const endDate = values.sickLeave?.endDate;

          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!startDate) {
            sickLeave.startDate = requiredError;
            errors.sickLeave = sickLeave;
          } 
          if (!endDate) {
            sickLeave.endDate = requiredError;
            errors.sickLeave = sickLeave;
          }
          if (startDate && !isDate(startDate)) {
            sickLeave.startDate = malformattedError + `date YYYY-MM-DD`;
            errors.sickLeave = sickLeave;
          }
          if (endDate && !isDate(endDate)) {
            sickLeave.endDate = malformattedError + `date YYYY-MM-DD`;
            errors.sickLeave = sickLeave;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectFieldTypes
              label='Type'
              name='type'
              onChange={onChangeType}
              options= {typeOptions}
            />
            <Field
              label="Description:"
              placeholder="Enter description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date:"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist:"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            />
            {
              values.type === Type.Hospital && 
              <>
                <label><b>Discharge:</b></label>
                <Field
                  label="Date:"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria:"
                  placeholder="Enter Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
             </>
            }
            {
              values.type === Type.HealthCheck && 
                <Field
                  label="Health check rating :"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
               />
            }
            {
              values.type === Type.OccupationalHealthcare && 
              <>
              <Field
                label="Employer name:"
                placeholder=" Enter employer name"
                name="employerName"
                component={TextField}
              />
              <label><b>Sick leave:</b></label>
              <Field
                label="Start date:"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="End date:"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
            </>
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;
