import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import ValidatedTextField from '../../formControl/ValidatedTextField';
import MultiSelect from '../../formControl/MultiSelect';
import authorsTableData from '../tables/data/authorsTableData';
import Table from '../../formControl/Table';
import SoftTypography from '../../components/SoftTypography';
import SoftBox from '../../components/SoftBox';
import SoftBadge from '../../components/SoftBadge';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { gridClasses } from "@mui/material";
import CustomTable from '../../formControl/Table';


const top100Films = [
  { title: 'AIRTEL', year: 1994 },
  { title: 'TATA', year: 1972 }
];


const Entites = [
  { label: "112************3456", value: "112************3456" },
  { label: "112************3454", value: "112************3454" },
  { label: "112************3453", value: "112************3453" },
  { label: "112************3452", value: "112************3452" },
];

let columns = [
  { field: "Peid", headerName: "Principal Entity Identifier", minWidth: 50, flex: 1 },
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
    ApprovedOn: `${(new Date()).toISOString().split('T')[0]}`,
    Status: "Approved",
    action: "Edit",
  },
  {
    Peid: "3",
    Sender: "ICCSAZ",
    Entity: "120**********786",
    ApprovedOn: `${(new Date()).toISOString().split('T')[0]}`,
    Status: "Approved",
    action: "Edit",
  },
]

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
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// templateName: '',
// templateId: '',
// templateBody: '',
// pid: '',




export default function ManageSender() {
  // const { columns, rows } = authorsTableData;
  const [pageSize, setPageSize] = useState(5);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [formData, setFormData] = useState({
    sendername: '',
    PEID: '',
    category: '',
    tid: '',
    ttype: '',
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  return (

    <Box sx={{ flexGrow: 1 }}>
      {/* <Grid container>
        <Grid item xs={4} md={3} px={1} mt={3}>
          <SoftBox pt={2} pb={1}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput placeholder="Entity" />
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={4} md={3} px={1} mt={3}>
          <SoftBox pt={2} pb={1}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput type="sender" placeholder="Sender Name" />
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid> */}

      <Grid container spacing={2} mt={1} alignItems="center">
        {/* <Grid item>
          <MultiSelect
            options={top100Films}
            getOptionLabel={(option) => option.title}
            placeholder="Peid"
            name='Peid'
            onChange={(event, newValue) => handleInputChange('Peid', newValue)}

          />
        </Grid> */}
        {/* <Grid item>
          <MultiSelect
            options={Entites}
            getOptionLabel={(option) => option.label}
            placeholder="Principal Entity Identifier"
            name="entity"
            onChange={(event, newValue) => handleInputChange('entity', newValue)}

          />
        </Grid>
        <Grid item>
          <ValidatedTextField
            name="sender"
            variant="outlined"
            size="small"
            placeholder="Sender Name"
            value={formData.tid}
            onChange={(value) => handleInputChange('sender', value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" size='small' text='white' color="primary" onClick={handleSubmit}>
            Search
          </Button>
        </Grid> */}
      </Grid>



      <Grid container spacing={2}>
        {/* tabel */}
        <Grid item xs={12} md={8}>
          <Card>
            <SoftBox >
              <SoftBox mb={3}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
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
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
              <h6>Add Sender</h6>
            </SoftBox>
            <Grid spacing={2} mt={2}>
              <form onSubmit={handleSubmit}>

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
              </form>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
