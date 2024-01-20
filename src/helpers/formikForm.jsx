import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ValidatedTextField from "../formControl/ValidatedTextField";
import MultiSelect from "../formControl/MultiSelect";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ColorSwitch } from "../formControl/SwitchButton";
import ValidatedTextArea from "../formControl/ValidatedTextArea";
import SoftButton from "../components/SoftButton";

const DynamicForm = ({ fields, submitfunction, initialValues }) => {
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
    },
  });

  useEffect(() => {
    formik.setValues(initialValues);
  }, [initialValues]);

   const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
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
        );
      case "textarea":
        return (
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
          <>
            <MultiSelect
              key={field.name}
              multiple={field.multiple}
              options={field.options}
              getOptionLabel={(option) => option.name}
              placeholder={field.placeholder}
              value={fieldValues}
              onChange={(event, value) =>
                formik.setFieldValue(field.name, value)
              }
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div style={{ color: "red" }}>{formik.errors[field.name]}</div>
            )}
          </>
        );
      case "checkbox":
        return (
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
        );
      case "switch":
        return (
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

  const handleReset = () => {
    formik.resetForm({ values: initialValues });

    fields.data.forEach((field) => {
      if (field.type === "multiSelect") {
        formik.setFieldValue(
          field.name,
          field.multiple ? [] : initialValues[field.name]
        );

        if (field.onChange) {
          field.onChange(field.multiple ? [] : initialValues[field.name]);
        }
      }
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container my={2}>
        {fields.data.map((field) => renderField(field))}
        <Grid container justifyContent={fields.buttons.className}>
          <SoftButton
            variant="contained"
            size="small"
            color="dark"
            type="reset"
            // onClick={handleReset}
            // onClick={formik.handleReset}
            onClick={formik.resetForm}
          >
            {fields.buttons.resetButton.label}
          </SoftButton>
          {/* <Button type="reset" variant="contained" size="small" color="dark">
            {fields.buttons.resetButton.label}
          </Button> */}
          {/* <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
          >
            {fields.buttons.submitButton.label}
          </Button> */}
          <SoftButton
            variant="contained"
            size="small"
            color="dark"
            type="submit"
          >
            {fields.buttons.submitButton.label}
          </SoftButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm;
