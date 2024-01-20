import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftTypography from "../../components/SoftTypography";
import SoftBox from "../../components/SoftBox";
import CustomTable from "../../formControl/Table";
import DynamicApiCall from "../../utils/function";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";

const top100Films = [
  { title: "AIRTEL", year: 1994 },
  { title: "TATA", year: 1972 },
];

const Entites = [
  { label: "112************3456", value: "112************3456" },
  { label: "112************3454", value: "112************3454" },
  { label: "112************3453", value: "112************3453" },
  { label: "112************3452", value: "112************3452" },
];

let columns = [
  {
    field: "Peid",
    headerName: "Principal Entity Identifier",
    minWidth: 50,
    flex: 1,
  },
  { field: "Sender", headerName: "Sender", minWidth: 50, flex: 1 },
  { field: "Entity", headerName: "Entity", minWidth: 50, flex: 1 },
  { field: "ApprovedOn", headerName: "ApprovedOn", minWidth: 50, flex: 1 },
  { field: "Status", headerName: "Status", minWidth: 50, flex: 1 },
  { field: "action", headerName: "action", minWidth: 50, flex: 1 },
];

// one Peid have multipaal sender ids
const rows = [
  {
    Peid: "2",
    Sender: "ICCSAZ",
    Entity: "120**********786",
    ApprovedOn: `${new Date().toISOString().split("T")[0]}`,
    Status: "Approved",
    action: "Edit",
  },
  {
    Peid: "3",
    Sender: "ICCSAZ",
    Entity: "120**********786",
    ApprovedOn: `${new Date().toISOString().split("T")[0]}`,
    Status: "Approved",
    action: "Edit",
  },
];

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        {/* <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography> */}
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      {/* <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography> */}
    </SoftBox>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// templateName: '',
// templateId: '',
// templateBody: '',
// pid: '',

export default function ManageSender() {
  const [initial, setinitial] = useState({
    peid: "",
    peidName: "",
    remarks: "",
  });

  async function formsubmit(values) {
    const apiUrl = "";
    const method = "post";
    // const modifiedValues = prepareFormValues(values);
    try {
      const apiResponse = await DynamicApiCall(apiUrl, method, initial);
      console.log("API Response:", apiResponse);
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  const JsonFields = {
    data: [
      {
        multiple: false,
        name: "peid",
        placeholder: "Entity Id",
        type: "multiSelect",
        options: [
          { value: "ADMIN", name: "ADMIN" },
          { value: "SUPER-ADMIN", name: "SUPER-ADMIN" },
          { value: "AGENT", name: "AGENT" },
          { value: "TEM-LEAD", name: "TEM-LEAD" },
        ],
        validation: Yup.object().required("User Group is required"),
      },
      {
        multiple: false,
        name: "sender",
        placeholder: "Entity Id",
        type: "multiSelect",
        options: [
          { value: "ADMIN", name: "ADMIN" },
          { value: "SUPER-ADMIN", name: "SUPER-ADMIN" },
          { value: "AGENT", name: "AGENT" },
          { value: "TEM-LEAD", name: "TEM-LEAD" },
        ],
        validation: Yup.object().required("User Group is required"),
      },
    ],
    buttons: {
      className: "space-around",
      submitButton: {
        style: {},
        label: "Create Entity",
      },
      resetButton: {
        style: {},
        label: "Clear",
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} mt={1} alignItems="center"></Grid>

      <Grid container spacing={2}>
        {/* tabel */}
        <Grid item xs={12} md={8}>
          <Card>
            <SoftBox>
              <SoftBox mb={3}>
                <SoftBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={3}
                >
                  <SoftTypography variant="h6">Manage Sender</SoftTypography>
                </SoftBox>
                <SoftBox
                // sx={{
                //   "& .MuiTableRow-root:not(:last-child)": {
                //     "& td": {
                //       borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                //         `${borderWidth[1]} solid ${borderColor}`,
                //     },
                //   },
                // }}
                >
                  <CustomTable rows={rows} columns={columns} uniquekey="Peid" />
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </Grid>

        {/* form */}
        <Grid item xs={12} md={4}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pt={2}
              px={2}
            >
              <h6>Add Sender</h6>
            </SoftBox>
            <Grid spacing={2} mt={2}>
              {/* <form onSubmit={handleSubmit}>

                <ValidatedTextField
                  name="sender"
                  variant="outlined"
                  size="small"
                  placeholder="Principal Entity(PEID)"
                  value={formData.ttype}
                  onChange={(value) => handleInputChange('sender', value)}
                />
                <ValidatedTextField
                  name="sender"
                  variant="outlined"
                  size="small"
                  placeholder="Principal Entity Name"
                  value={formData.ttype}
                  onChange={(value) => handleInputChange('sender', value)}
                />

                <ValidatedTextField
                  name="sender"
                  variant="outlined"
                  size="small"
                  placeholder="Sender id"
                  value={formData.ttype}
                  onChange={(value) => handleInputChange('sender', value)}
                />


                <Grid item>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Grid>
              </form> */}
              <DynamicForm
                submitfunction={formsubmit}
                initialValues={initial}
                fields={JsonFields}
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
