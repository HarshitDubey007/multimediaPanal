import { React, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '../../formControl/Table';
import ValidatedTextField from '../../formControl/ValidatedTextField';
import SoftBox from '../../components/SoftBox';
import DaynmicApicall, { makeApiRequest } from '../../utils/function';
import SoftTypography from '../../components/SoftTypography';
import Pagination from '@mui/material/Pagination';
import * as Yup from 'yup';

import CustomTable from '../../formControl/Table';
import DynamicForm from '../../helpers/formikForm';



const handleSubmit = (event) => {
  event.preventDefault();
  // Add your form submission logic here
  // let formsData = new FormData(event.target);
  // formsData = Object.fromEntries(formsData.entries());


  // console.log("formsData::", formsData);
};


const handleInputChange = (name, value) => {
  // setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  // }));
};








export default function SendSms() {
  const [apiData, setApiData] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const Info = await DaynmicApicall('sms/getentity', 'get');
        console.log('Info:', Info);
        setApiData(Info.results)
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    })();
  }, [])

  let columns = [
    { field: "peid", headerName: "Peid(Principal Entity)", minWidth: 50, flex: 1 },
    { field: "peid", headerName: "Principal Entity name", minWidth: 50, flex: 1 },
    {
      field: "created_on", headerName: "created_on", minWidth: 200, flex: 1,
      headerClassName: "table-header"
    },

    {
      field: "is_active", headerName: "is_active", minWidth: 100, flex: 1
    }

  ];




  return (
    <>
      <Grid container spacing={2} mt={2}>
        {/* <Grid item xs={12} md={8}>
          <SoftBox mt={1}>
            <SoftBox mb={3}>
              <Card>
              <SoftBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table
                  columns={columns}
                  rows={rows}
                  headerValue="Manage Entites"
                />
              </SoftBox>
              </Card>
            </SoftBox>
          </SoftBox>
        </Grid> */}
        <Grid item xs={12} md={8}>
          <Card>
            <SoftBox >
              <SoftBox mb={3}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
                  <SoftTypography sx={{ fontWeight: 'bold' }} variant="h6">Manage Client Entity</SoftTypography>
                </SoftBox>
                <SoftBox
                  sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  <CustomTable rows={apiData} columns={columns} uniquekey="entityid" />
                </SoftBox>
              </SoftBox>

            </SoftBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
              <h6>Create Client Entity</h6>
            </SoftBox>
            {/* <Grid spacing={2} mt={2}>
              <form onSubmit={handleSubmit}>
                <ValidatedTextField
                  name="EntityID"
                  variant="outlined"
                  size="small"
                  placeholder="Entity(PEID)"
                  // value={formData.tid}
                  onChange={(value) => handleInputChange('EntityID', value)}
                />
                <ValidatedTextField
                  name="EntityID"
                  variant="outlined"
                  size="small"
                  placeholder="Principal Entity name"
                  // value={formData.tid}
                  onChange={(value) => handleInputChange('EntityID', value)}
                />
                <ValidatedTextField
                  name="remarks"
                  variant="outlined"
                  size="small"
                  placeholder="Remarks"
                  // value={formData.ttype}
                  onChange={(value) => handleInputChange('remarks', value)}
                />
                <Grid item>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Grid>
              </form>
            </Grid> */}
            <DynamicForm
              submitfunction={() => { }}
              initialValues={{}}
              fields={[
                {
                  multiple: false,
                  name: 'EntityID',
                  placeholder: 'Entity Id',
                  type: 'multiSelect',
                  options: [
                    { value: 'ADMIN', name: 'ADMIN' },
                    { value: 'SUPER-ADMIN', name: 'SUPER-ADMIN' },
                    { value: 'AGENT', name: 'AGENT' },
                    { value: 'TEM-LEAD', name: 'TEM-LEAD' },
                  ],
                  validation: Yup.object().required('User Group is required'),
                },
                {
                  multiple: false,
                  name: 'EntityID',
                  placeholder: 'Entity Id',
                  type: 'multiSelect',
                  options: [
                    { value: 'ADMIN', name: 'ADMIN' },
                    { value: 'SUPER-ADMIN', name: 'SUPER-ADMIN' },
                    { value: 'AGENT', name: 'AGENT' },
                    { value: 'TEM-LEAD', name: 'TEM-LEAD' },
                  ],
                  validation: Yup.object().required('User Group is required'),
                },
                {
                  name: 'remarks',
                  placeholder: 'User Name',
                  validation: Yup.string().required('remarks is required'),
                  type: 'text',
                },

              ]} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}




// validityPeriod
// track
// type
// notifyUrl
// text(templete body)
// contentTemplateId
// principalEntityId
// to
// from
// actions