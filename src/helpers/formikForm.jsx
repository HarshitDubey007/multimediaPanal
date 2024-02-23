import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ValidatedTextField from "../formControl/ValidatedTextField";
import MultiSelect from "../formControl/MultiSelect";
import ValidatedTextArea from "../formControl/ValidatedTextArea";
import SoftButton from "../components/SoftButton";
import Grid from "@mui/material/Grid";
import { ColorSwitch } from "../formControl/SwitchButton";

const DynamicForm = ({ fields, submitfunction, initialValues }) => {
  const [fieldValueStatus, setFieldValueStatus] = useState(false);
  const validationSchema = Yup.object().shape(
    fields.data.reduce((schema, field) => {
      switch (field.type) {
        case "text":
          return { ...schema, [field.name]: field.validation || Yup.string() };
        case "multiSelect":
          return {
            ...schema,
            [field.name]: field.multiple
              ? field.validation || Yup.array()
              : field.validation || Yup.string(),
          };
        case "textarea":
          return { ...schema, [field.name]: field.validation || Yup.string() };
        // Add additional cases as needed
        default:
          return schema;
      }
    }, {})
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitfunction(values);
      setFieldValueStatus(false);
    },
  });

  useEffect(() => {
    if (initialValues.action_name === "UPDATE") {
      const updatedValues = {};

      fields.data.forEach((field) => {
        // console.log("fieldName, field:: ", field)
        if (field.type === "multiSelect") {
          const fieldValues = field.multiple
            ? field.options?.filter((v) =>
                initialValues[field.name]?.includes(v.value)
              )
            : field.options?.find((v) =>
                initialValues[field.name]?.includes(v.value)
              );

          updatedValues[field.name] = fieldValues;
        }
      });

      // console.log("updatedValues:: ", updatedValues)
      formik.setValues((values) => ({
        ...values,
        ...initialValues,
        ...updatedValues,
      }));
    }
    setFieldValueStatus(true);
  }, [initialValues, fields, formik.setValues]);

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <ValidatedTextField
            fullWidth={field.fullWidth || false}
            value={formik.values[field.name]}
            onChange={(value) => formik.setFieldValue(field.name, value)}
            placeholder={field.placeholder || ""}
            onBlur={() => formik.setFieldTouched(field.name, true)}
            error={formik.touched[field.name] && !!formik.errors[field.name]}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
          />

          // <SoftInput
          //   fullWidth={field.fullWidth || false}
          //   value={formik.values[field.name]}
          //   onChange={(value) => formik.setFieldValue(field.name, value)}
          //   placeholder={field.placeholder || ""}
          //   onBlur={() => formik.setFieldTouched(field.name, true)}
          //   error={formik.touched[field.name] && !!formik.errors[field.name]}
          //   helperText={
          //     formik.touched[field.name] && formik.errors[field.name]
          //   }

          //   size="medium"
          //   icon={{ component: false, direction: "none" }}
          //   success={false}
          //   disabled={false}
          //   margin="normal"
          //   autoFocus
          // />
        );
      case "textarea":
        return (
          <ValidatedTextArea
            fullWidth={field.fullWidth}
            value={formik.values[field.name]}
            onChange={(value) => formik.setFieldValue(field.name, value)}
            placeholder={field.placeholder || ""}
            onBlur={() => formik.setFieldTouched(field.name, true)}
            error={formik.touched[field.name] && !!formik.errors[field.name]}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
          />
        );
      case "multiSelect":
        return (
          <>
            <MultiSelect
              key={field.name}
              multiple={field.multiple}
              options={field.options}
              getOptionLabel={(option) => option.name}
              placeholder={field.placeholder}
              value={formik.values[field.name] || []}
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
          field.multiple ? [] : initialValues[field.name] || []
        );

        if (field.onChange) {
          field.onChange(field.multiple ? [] : initialValues[field.name] || []);
        }
      }
    });
  };

  // console.log("Formik.valuse         =====", formik.values)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container my={2}>
        {fieldValueStatus && fields.data.map((field) => renderField(field))}
        <Grid container justifyContent={fields.buttons.className}>
          <Grid>
            <SoftButton
              // variant="contained"
              size="small"
              // color="dark"
              type="reset"
              variant="gradient"
              color="info"
              onClick={formik.resetForm}
            >
              {fields.buttons.resetButton.label}
            </SoftButton>
          </Grid>
          <Grid>
            <SoftButton
              variant="contained"
              size="small"
              color="success"
              type="submit"
            >
              {fields.buttons.submitButton.label}
            </SoftButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm;
