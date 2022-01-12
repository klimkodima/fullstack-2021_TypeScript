import React from "react";
import { Form } from "semantic-ui-react";
import { Field } from "formik";

interface TypeOptions {
  value: string;
  label:string;
}

type SelectTypeProps = {
  name: string;
  label: string;
  defaultValue:string;
  onChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
};

const typeOptions : TypeOptions[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "HealthCheck", label: "Health Check" }
];

export const SelectType = ({
  name,
  label,
  defaultValue,
  onChange
}: SelectTypeProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown" onChange={onChange}>
      <option key={defaultValue} value={defaultValue.replace(/ /g, '')}>{defaultValue}</option>

      {typeOptions.map(option => {
        if(option.value !== defaultValue.replace(/ /g, '')) {
          return (<option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>);
        }
        else return null;
      })}
    </Field>
  </Form.Field>
);

