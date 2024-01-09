import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ValidatedTextField from "../formControl/ValidatedTextField";
import MultiSelect from "../formControl/MultiSelect";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ColorSwitch } from "../formControl/SwitchButton";
import ValidatedTextArea from "../formControl/ValidatedTextArea";

const DynamicForm = ({ fields, submitfunction, initialValues }) => {
  console.log("fields, submitfunction, initialValues:: ", initialValues)
  const [switchValue, setSwitchValue] = useState(
    initialValues && initialValues.switchValue
  );
  const validationSchema = Yup.object().shape(
    fields.data.reduce((schema, field) => {
      if (field.type === "text") {
        return { ...schema, [field.name]: field.validation || Yup.string() };
      } else if (field.type === "multiSelect") {
        if (field.multiple === false)
          return { ...schema, [field.name]: field.validation || Yup.array() };
      } else if (field.type === "date") {
        // ... (your existing date validation)
      } else if (field.type === "textarea") {
        return { ...schema, [field.name]: field.validation || Yup.string() };

      }

      return schema;
    }, {})
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitfunction(values);
      console.log("Form Values:", values);
    },
  });

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          // <Grid item xs={12} sm={4} key={field.name}>
          <>
            <ValidatedTextField
              fullWidth={field.fullWidth ? field.fullWidth : false}
              value={formik.values[field.name]}
              onChange={(value) => formik.setFieldValue(field.name, value)}
              placeholder={field.placeholder || ""}
              onBlur={() => formik.setFieldTouched(field.name, true)}
              error={formik.touched[field.name] && !!formik.errors[field.name]}
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
            />
          </>
          // </Grid>
        );
      case "textarea":
        return (
          // <Grid item xs={12} sm={4} key={field.name}>
          <>
            <ValidatedTextArea
              fullWidth={field.fullWidth}
              value={formik.values[field.name]}
              onChange={(value) => formik.setFieldValue(field.name, value)}
              placeholder={field.placeholder || ""}
              onBlur={() => formik.setFieldTouched(field.name, true)}
              error={formik.touched[field.name] && !!formik.errors[field.name]}
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
            />
          </>
          // </Grid>
        );
      case "multiSelect":
        let fieldValues;
        if (initialValues && initialValues.action_name === "UPDATE") {
          fieldValues =
            field.multiple === true
              ? field.options?.filter((v) =>
                initialValues[field.name].includes(v.value)
              )
              : field.options?.find((v) =>
                initialValues[field.name].includes(v.value)
              );
        }

        return (
          // <Grid item xs={12} sm={4} key={field.name}>
          <>
            <MultiSelect
              key={field.name}
              multiple={field.multiple}
              options={field.options}
              getOptionLabel={(option) => option.name}
              placeholder={field.placeholder}
              value={fieldValues} // Set the value prop for MultiSelect
              onChange={(event, value) =>
                formik.setFieldValue(field.name, value)
              }
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div style={{ color: "red" }}>{formik.errors[field.name]}</div>
            )}
          </>
          // </Grid>
        );
      case "checkbox":
        return (
          // <Grid item xs={12} key={field.name}>
          <label>
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {field.label}
          </label>
          // </Grid>
        );
      case "switch":
        return (
          // <Grid item xs={12} key={field.name}>
          <ColorSwitch
            label={field.label}
            checked={formik.values[field.name]}
            onChange={() =>
              formik.setFieldValue(field.name, !formik.values[field.name])
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container my={2}>
        {fields.data.map((field) => renderField(field))}
        <Grid container justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
          >
            {fields.buttons.submitButton.label}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm;
