import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, NumberField, TypeSelectField } from "../AddPatientModal/FormField";
import { EntryFormValues, TypeOption } from "../types";


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  {value: "HealthCheck", label: "HealthCheck"},
  {value: "Hospital", label: "Hospital"},
  {value: "OccupationalHealthcare", label: "OccupationalHealthcare"}
];

const isDate = (date: string): boolean => {
  if (date.length===0) {
    return true;
  }
  return Boolean(Date.parse(date));
};

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
 const today = new Date().toISOString().split('T')[0];

  return (
    <Formik
      initialValues={{
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        date: `${today}`,
        specialist: "",
        description: "",
        type: "",
        healthCheckRating: 0,
        discharge: {
          date: "",
          criteria: ""
        },
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        employerName: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Malformatted date";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !isDate(values.date)) {
          errors.date = dateError;
        }
        if (!values.specialist || values.specialist.length === 0) {
          errors.specialist = requiredError;
        }
        if (!values.description || values.description.length === 0) {
          errors.description = requiredError;
        }
        if (values.type === "HealthCheck") {
          const healthCheckRating = values.healthCheckRating;
          if (!healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (![0,1,2,3].includes(healthCheckRating as number)) {
          errors.healthCheckRating = "value must be 0-3";
        }
        }
        if (values.type === "Hospital") {
          const discharge = values.discharge;
          if (discharge && !isDate(discharge.date)) {
          errors.discharge = dateError;
        }
        }
        if (values.type === "OccupationalHealthcare") {
          const sickLeave = values.sickLeave;
          if (sickLeave && (!isDate(sickLeave.startDate) || !isDate(sickLeave.endDate))) {
          errors.sickLeave = dateError;
        }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, errors }) => {
        return (
          <Form className="form ui">
            <TypeSelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
             <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {values.type === "HealthCheck" && 
            <>
            <Field
              label="Rating"
              placeholder="0"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            </>
            }
            {values.type === "Hospital" &&
            <>
            <Field
            label="Discharge Date"
            placeholder="Discharge Date"
            name="discharge.date"
            component={TextField}
          />
          <div style={{color: "red", marginBottom: 5}}>{errors.discharge}</div>
          <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
            />
          </>
            }
            {values.type === "OccupationalHealthcare" &&
            <>
             <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
             <div style={{color: "red", marginBottom: 5}}>{errors.sickLeave}</div>
             <Field
              label="Sick leave start date"
              placeholder="Sick leave start date"
              name="sickLeave.startDate"
              component={TextField}
            />
              <Field
              label="Sick leave end date"
              placeholder="Sick leave end date"
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

export default AddEntryForm;
