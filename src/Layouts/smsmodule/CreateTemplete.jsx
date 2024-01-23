import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "../../components/SoftBox";
import CustomTable from "../../formControl/Table";
import Tooltip from "@mui/material/Tooltip";
import { MutedCell } from "../../formControl/TableCellLayouts/tableCellLayouts";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DynamicForm from "../../helpers/formikForm";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import DynamicApiCall from "../../utils/function";

export default function ManageTemplate() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [templateData, setTemplateData] = useState("");
  const [getrows, setrows] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [initial, setinitial] = useState({
    // peid: "",
    // client_name: "",
    // client_code: "",
    // office_address: "",
    // status: "Y",
    // remarks: "",
    // userid: userid,
    // action_name: "INSERT"


    templateid: "",
    templatename: "",
    peid: "",
    senderid: "",
    tempbody: "",
    temptype: "",
    tempvariables: "",
    campid: "",
    dlt_success: "",
    remarks: "",
    status: "Y",
    userid: userid,
    action_name: "INSERT"
  });

  useEffect(() => {
    (async () => {
      try {

        const Info = await DynamicApiCall("sms/gettemplate", "get", token);
        console.log("Info.results:: ", Info.data);
        setrows(Info.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    })();
  }, []);

  let columns = [

    {
      field: "templateid",
      headerName: "Template id",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "templatename",
      headerName: "Template name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "peid",
      headerName: "Peid",
      minWidth: 200,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "senderid",
      headerName: "Sender id",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    // {
    //   field: "peid",
    //   headerName: "Peid(Principal Template)",
    //   minWidth: 200,
    //   renderCell: (params) =>
    //     params.value && <MutedCell title={params.value} org="Organization" />,
    // },
    {
      field: "tempbody",
      headerName: "Tempplete body",
      minWidth: 200,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "temptype",
      headerName: "Templete type",
      minWidth: 200,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "tempvariables",
      headerName: "tempvariables",
      minWidth: 200,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    // {
    //   field: "peid",
    //   headerName: "Peid(Principal Template)",
    //   minWidth: 200,
    //   renderCell: (params) =>
    //     params.value && <MutedCell title={params.value} org="Organization" />,
    // },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "remarks",
      headerName: "remarks",
      minWidth: 180,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "created_on",
      headerName: "Created On",
      minWidth: 100,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "is_active",
      headerName: "Is Active",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 80,
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          onClick={() => {
            params.row.action_name = "UPDATE";
            let editData = {
              ...params.row,
              status: params.row.is_active
            }
            delete editData.updated_on; delete editData.updated_by; delete editData.created_on;
            delete editData.sno; delete editData.is_active
            console.log("editData", editData)
            setTemplateData(editData);
          }}
          showInMenu
        />,

        <GridActionsCellItem label="Delete" onClick={(e) => { }} showInMenu />,
      ],
    },
  ];

  const JsonFields = {
    data: [
      {
        name: "templateid",
        placeholder: "template Id",
        validation: Yup.string().required("Template Id is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "templatename",
        placeholder: "templatename Name",
        validation: Yup.string().required("Client Name is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "senderid",
        placeholder: "Sender id",
        validation: Yup.string().required("senderid Code is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "remarks",
        placeholder: "remarks",
        // validation: Yup.string().required("remarks is required"),
        type: "text",
        fullWidth: true,

      },
    ],
    buttons: {
      className: "space-around",
      submitButton: {
        style: {},
        label: "Save Template",
      },
      resetButton: {
        style: {},
        label: "Clear",
      },
    },
  };

  async function formsubmit(values) {
    const apiUrl = "sms/managetemplate";
    const method = "post";
    // const modifiedValues = prepareFormValues(values);
    try {
      console.log("values:: ", values)
      const apiResponse = await DynamicApiCall(apiUrl, method, token, values);
      console.log("API Response:", apiResponse);
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  return (
    <>
      <div>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={8}>
            <SoftBox mt={1}>
              <SoftBox mb={3}>
                <Card
                  sx={{
                    height: 300,
                    width: "100%",
                    "& .table-header": {
                      fontWeight: "bold !important",
                      color: "#6c757d",
                    },
                  }}
                >
                  <Grid container justifyContent="space-between" px={2} py={1}>
                    <Grid item>Manage Client Template</Grid>
                  </Grid>
                  <CustomTable
                    rows={getrows ? getrows : []}
                    columns={columns}
                    uniquekey="peid"
                  />
                </Card>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <SoftBox mt={1}>
              <SoftBox mb={3}>
                <Card style={{ padding: "10px" }}>
                  <Grid container justifyContent="space-between" px={2} pt={1}>
                    <Grid item>
                      {templateData ? templateData.action_name : "Add"} User Template
                    </Grid>
                  </Grid>
                  <hr
                    style={{
                      backgroundColor: "#e8e5e5",
                      margin: "0 auto",
                      width: "100%",
                    }}
                  />

                  <DynamicForm
                    submitfunction={formsubmit}
                    initialValues={templateData ? templateData : initial}
                    fields={JsonFields}
                  />
                </Card>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </div>
    </>
  );
}





























// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import MultiSelect from "../../formControl/MultiSelect";
// import ValidatedTextField from "../../formControl/ValidatedTextField";
// import SoftBox from "../../components/SoftBox";
// import Card from "@mui/material/Card";
// import Tooltip from "@mui/material/Tooltip";
// import * as Yup from "yup";
// import Table from "../../formControl/Table";
// import { getFormData } from "../../helpers/helpers";
// import {
//   GridActionsCellItem,
//   DataGrid,
//   GridToolbarColumnsButton,
//   GridToolbarContainer,
//   GridToolbarDensitySelector,
//   GridToolbarExport,
//   GridToolbarFilterButton,
// } from "@mui/x-data-grid";
// import Stack from "@mui/material/Stack";
// import { gridClasses } from "@mui/material";
// import SoftBadge from "../../components/SoftBadge";
// import SoftTypography from "../../components/SoftTypography";
// import SendsmsModel from "./SendsmsModel";
// import ValidatedTextArea from "../../formControl/ValidatedTextArea";
// import useForm from "../../helpers/HandelForm";
// import DynamicForm from "../../helpers/formikForm";
// import DynamicApiCall from "../../utils/function";
// import SoftButton from "../../components/SoftButton";

// function Function({ title }) {
//   return (
//     <SoftBox display="flex" flexDirection="column">
//       <SoftTypography variant="caption" fontWeight="medium" color="text">
//         {title}
//       </SoftTypography>
//     </SoftBox>
//   );
// }

// const rows = [
//   {
//     sr: "1",
//     tamplate:
//       "Dear Customer, Make sure you don't compromise on the future of your loved ones. Renew your  Aditya Birla Sun Life Insurance policy today by paying your premium of Rs. {#var#} on your policy {#var#} which is due on {#var#}. Click to pay now or locate branch Click https://bit.ly/2UIeKVG. Ignore if already paid. T&C Apply. - ABSLI.",
//     category: "ICCSII",
//     TemplateID: "11122********1233",
//     Status: "Approved",
//     Action: "",
//   },
//   {
//     sr: "3",
//     tamplate:
//       "Dear {#var#}, Renew your policy on time and stay protected. Click now to pay online or locate branch https://bit.ly/2UIeKVG. Ignore if already paid. T&C Apply. - ABSLI.",
//     category: "ICCSII",
//     TemplateID: "11122********1233",
//     Status: "Approved",
//     Action: "",
//   },
//   {
//     sr: "4",
//     tamplate:
//       "Dear Customer, Avoid losing out on reviving your lapsed policy and losing accumulated policy benefits. Pay due premium of {#var#} to revive your policy no. {#var#} and continue to protect your family's financial future. Click here to pay now or locate branch  https://bit.ly/2UIeKVG  Ignore if already paid. T&C Apply. - ABSLI.",
//     category: "ICCSII",
//     TemplateID: "11122********1233",
//     Status: "Approved",
//     Action: "",
//   },
// ];

// const top100Films = [
//   { title: "AIRTEL", year: 1994 },
//   { title: "TATA", year: 1972 },
// ];

// const Entites = [
//   { label: "112************3456", value: "112************3456" },
//   { label: "112************3454", value: "112************3454" },
//   { label: "112************3453", value: "112************3453" },
//   { label: "112************3452", value: "112************3452" },
// ];

// const Item = styled(Grid)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// export default function CreateTemplate() {
//   const [pageSize, setPageSize] = useState(5);
//   const [filterColumn, setFilterColumn] = useState("");
//   const [filterValue, setFilterValue] = useState("");
//   const [uploadData, setFormData] = useState({
//     sendername: "",
//     template: "",
//     file: null,
//   });
//   const [addTemplete, setAddTemplete] = useState({
//     sendername: "",
//     PEID: "",
//     category: "",
//     tid: "",
//     ttype: "",
//   });

//   const { formData, handleFieldChange, handleSubmit } = useForm(
//     {
//       sendername: "",
//       PEID: "",
//       category: "",
//       tid: "",
//       ttype: "",
//       tempbody: "",
//     },
//     (data) => {
//       // Add your form submission logic here
//       console.log("ManageUsers Form Data:", data);
//     }
//   );

//   const [selectedRow, setSelectedRow] = React.useState(null);

//   const handleSendsmsModelOpen = (row) => {
//     setSelectedRow(row);
//   };

//   const handleSendsmsModelClose = () => {
//     setSelectedRow(null);
//   };

//   const handleAddTemplete = (name, value) => {
//     setAddTemplete((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleInputChange = (name, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileUpload = (event) => {
//     event.preventDefault();
//     const formData = getFormData(event.target);
//     console.log("Uploaded File:", formData);
//   };

//   const handleManageTemplete = (event) => {
//     event.preventDefault();
//     const formData = getFormData(event.target);
//     console.log("Uploaded File:", formData, addTemplete);
//   };

//   const [initial, setinitial] = useState({
//     userid: "",
//     username: "",
//     usergroup: "",
//     userright: "",
//     campaignids: "",
//     userrole: "",
//     verifier: "",
//     lockstatus: true,
//     keypointer: "",
//     loginstatus: true,
//     active: true,
//     remarks: "",
//     createdby: "ADMIN",
//     languagename: "ENGLISH",
//     action_name: "INSERT",
//   });

//   async function formsubmit(values) {
//     const apiUrl = "user/manageuser";
//     const method = "post";
//     // const modifiedValues = prepareFormValues(values);
//     try {
//       const apiResponse = await DynamicApiCall(apiUrl, method, values);
//       console.log("API Response:", apiResponse);
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   }

//   const JsonFields = {
//     data: [
//       {
//         fullWidth: true,
//         multiple: true,
//         name: "sendername",
//         placeholder: "Select sender name",
//         type: "multiSelect",
//         options: [
//           { value: "AIRTEL", name: 1994 },
//           { value: "TATA", name: 1972 },
//         ],
//         validation: Yup.object().required("sender name is required"),
//       },
//       {
//         fullWidth: true,
//         multiple: true,
//         name: "template",
//         placeholder: "Select Principal Template Identifier",
//         type: "multiSelect",
//         options: [
//           { value: "AIRTEL", name: 1994 },
//           { value: "TATA", name: 1972 },
//         ],
//         validation: Yup.object().required("Template name is required"),
//       },
//       {
//         fullWidth: true,
//         multiple: true,
//         name: "template",
//         placeholder: "Select Principal Template Identifier",
//         type: "multiSelect",
//         options: [
//           { label: "112************3456", name: "112************3456" },
//           { label: "112************3454", name: "112************3454" },
//           { label: "112************3453", name: "112************3453" },
//           { label: "112************3452", name: "112************3452" },
//         ],
//         validation: Yup.object().required("Template name is required"),
//       },
//       {
//         fullWidth: true,
//         name: "tid",
//         placeholder: "Template Id",
//         validation: Yup.string().required("Template Id is required"),
//         type: "text",
//       },
//       {
//         fullWidth: true,
//         name: "ttype",
//         placeholder: "Template Type",
//         validation: Yup.string().required("Template Type is required"),
//         type: "text",
//       },
//       {
//         fullWidth: true,
//         name: "tbody",
//         placeholder: "Template Body",
//         validation: Yup.string().required("Template Body is required"),
//         type: "textarea",
//       },
//       // {
//       //     name: "active",
//       //     label: "active",
//       //     placeholder: "active",
//       //     type: "switch",
//       // },
//     ],
//     buttons: {
//       className: "space-around",
//       submitButton: {
//         style: {},
//         label: "Create User",
//       },
//       resetButton: {
//         style: {},
//         label: "Clear",
//       },
//     },
//   };

//   function CustomToolbar() {
//     return (
//       <>
//         <Stack direction="row" justifyContent="flex-end">
//           <GridToolbarContainer className={gridClasses.toolbarContainer}>
//             <GridToolbarExport />
//             <GridToolbarColumnsButton />
//             <GridToolbarDensitySelector />
//             {/* <GridToolbarFilterButton /> */}
//           </GridToolbarContainer>
//         </Stack>
//       </>
//     );
//   }

//   let columns = [
//     {
//       field: "sr",
//       headerName: "Sr.",
//       minWidth: 50,
//       flex: 1,
//     },
//     {
//       field: "tamplate",
//       headerName: "Templete",
//       minWidth: 200,
//       flex: 1,
//       headerClassName: "table-header",
//       renderCell: (params) =>
//         params.value && (
//           <Tooltip
//             title={<Function title={params.value} />}
//             color="inherit"
//             placement="bottom-start"
//           >
//             <span>
//               <Function title={params.value} />
//             </span>
//           </Tooltip>
//         ),
//     },

//     {
//       field: "category",
//       headerName: "category",
//       minWidth: 100,
//       flex: 1,
//       renderCell: (params) =>
//         params.value && <Function title={params.value} org="Organization" />,
//     },
//     {
//       field: "TemplateID",
//       headerName: "PEID",
//       minWidth: 150,
//       flex: 1,
//       renderCell: (params) =>
//         params.value && <Function title={params.value} org="Organization" />,
//     },
//     {
//       field: "Status",
//       headerName: "Status",
//       minWidth: 100,
//       flex: 1,
//       renderCell: (params) =>
//         params.value && <Function title={params.value} org="Organization" />,
//     },
//     {
//       field: "sendsms",
//       // type: "actions",
//       align: "center",
//       headerName: "Send sms",
//       width: 200,
//       flex: 1,
//       renderCell: (params) => (
//         <span
//           style={{ cursor: "pointer" }}
//           onClick={() => handleSendsmsModelOpen(params.row)}
//         >
//           Send sms
//         </span>
//       ),
//     },
//     {
//       field: "Action",
//       type: "actions",
//       width: 80,
//       flex: 1,
//       getActions: (params) => [
//         <GridActionsCellItem label="Edit" onClick={(e) => {}} showInMenu />,

//         <GridActionsCellItem label="Delete" onClick={(e) => {}} showInMenu />,
//       ],
//     },
//   ];

//   const getRowClassName = (params) => {
//     console.log("params::: ", params);
//     return params.row.TemplateID === "11122********1233" ? "highlighted-row" : "";
//   };

//   const onFilterChange = React.useCallback(async (filterModel) => {
//     if (
//       filterModel?.items?.[0]?.value &&
//       filterModel?.items?.[0]?.value.length > 0
//     ) {
//       setFilterColumn(filterModel?.items?.[0]?.columnField);
//       setFilterValue(filterModel?.items?.[0]?.value);
//     }
//   }, []);
//   const pageSizeOptions = [50, 70, 100];
//   return (
//     <div>
//       <div>
//         <span>Upload template file</span>
//       </div>
//       <Grid container spacing={2} style={{ marginTop: 1 }}>
//         <form onSubmit={handleFileUpload}>
//           <Grid container>
//             {/* Your form fields go here */}
//             <Grid item xs={12} md={3}>
//               <MultiSelect
//                 options={top100Films}
//                 getOptionLabel={(option) => option.title}
//                 placeholder="Sender Name"
//                 name="sendername"
//                 onChange={(value) => handleInputChange("sendername", value)}
//               />
//             </Grid>
//             {/* Other form fields */}
//             <Grid item xs={12} md={3}>
//               <MultiSelect
//                 options={Entites}
//                 getOptionLabel={(option) => option.label}
//                 placeholder="Principal Template Identifier"
//                 name="template"
//                 onChange={(value) => handleInputChange("template", value)}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <ValidatedTextField
//                 name="file"
//                 type="file"
//                 variant="outlined"
//                 placeholder="Select template file"
//                 // onChange={(event) => handleInputChange('file', event.target.files[0])}
//               />
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={3}
//               style={{ paddingTop: 10, paddingLeft: 40 }}
//             >
//               {/* <Button
//                 type="submit"
//                 variant="contained"
//                 size="small"
//                 color="primary"
//               >
//                 Upload Now
//               </Button> */}

//               <SoftButton
//                 variant="contained"
//                 size="small"
//                 color="dark"
//                 type="submit"
//               >
//                 Upload Now
//               </SoftButton>
//             </Grid>
//           </Grid>
//         </form>
//       </Grid>
//       <Grid container spacing={2} mt={2}>
//         <Grid item xs={12} md={8}>
//           <SoftBox mt={1}>
//             <SoftBox mb={3}>
//               <Card
//                 sx={{
//                   height: 300,
//                   width: "100%",
//                   "& .table-header": {
//                     fontWeight: "bold !important",
//                     color: "#6c757d",
//                   },
//                 }}
//               >
//                 <DataGrid
//                   getRowId={(row) => row.sr}
//                   rows={rows}
//                   columns={columns}
//                   rowCount={rows.length}
//                   rowHeight={40}
//                   pageSize={pageSize}
//                   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                   rowsPerPageOptions={pageSizeOptions}
//                   onFilterModelChange={onFilterChange}
//                   autoHeight={true}
//                   className="bg-white"
//                   // getSelectedRows={(data) => console.log("Selected Rows:", data)}
//                   density="compact"
//                   rowClassName={getRowClassName}
//                   components={{
//                     Toolbar: CustomToolbar,
//                   }}
//                 />
//               </Card>
//               {selectedRow && (
//                 <SendsmsModel
//                   data={selectedRow}
//                   onClose={handleSendsmsModelClose}
//                 />
//               )}
//             </SoftBox>
//           </SoftBox>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card>
//             <SoftBox
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               pt={2}
//               px={2}
//             >
//               <h6>Add Template</h6>
//             </SoftBox>
//             <Grid spacing={2} mt={2}>
//               <DynamicForm
//                 submitfunction={formsubmit}
//                 initialValues={initial}
//                 fields={JsonFields}
//               />
//               {/* <form onSubmit={handleSubmit}>
//                                 <MultiSelect
//                                     size="small"
//                                     name="sendername"
//                                     options={top100Films}
//                                     getOptionLabel={(option) => option.title}
//                                     placeholder="Sender Name"
//                                     onChange={(event, newValue) => handleFieldChange('sendername', newValue)}
//                                 />
//                                 <MultiSelect
//                                     size="small"
//                                     name="PEID"
//                                     options={top100Films}
//                                     getOptionLabel={(option) => option.title}
//                                     placeholder="PEID (Principal Template Identifier)"
//                                     onChange={(event, newValue) => handleFieldChange('PEID', newValue)}
//                                 />
//                                 <MultiSelect
//                                     size="small"
//                                     name="category"
//                                     options={Entites}
//                                     getOptionLabel={(option) => option.label}
//                                     placeholder="Category"
//                                     onChange={(event, newValue) => handleFieldChange('category', newValue)}
//                                 />
//                                 <ValidatedTextField
//                                     name="tid"
//                                     sx={{ width: { xs: '92%' } }}
//                                     variant="outlined"
//                                     size="small"
//                                     placeholder="Template Id"
//                                     value={formData.tid}
//                                     onChange={(value) => handleFieldChange('tid', value)}
//                                 />
//                                 <ValidatedTextField
//                                     name="ttype"
//                                     sx={{ width: { xs: '92%' } }}
//                                     variant="outlined"
//                                     size="small"
//                                     placeholder="Template Type"
//                                     value={formData.ttype}
//                                     onChange={(value) => handleFieldChange('ttype', value)}
//                                 />
//                                 <ValidatedTextArea
//                                     placeholder="Templete Body"
//                                     sx={{ width: { xs: '92%' } }}
//                                     name="tempbody"
//                                 // fullwidth={true}
//                                 // value={props.tamplate}
//                                 // onChange="{handleTextChange}"
//                                 // onBlur="{handleBlur}"
//                                 // error="{isError}"
//                                 // helperText="Must be at least 5 characters"
//                                 // validate={(value) => value.length >= 5}

//                                 />
//                                 <Grid item>
//                                     <Button type="submit" color="primary">
//                                         Submit
//                                     </Button>
//                                 </Grid>
//                             </form> */}
//             </Grid>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// // validityPeriod
// // track
// // type
// // notifyUrl
// // text(templete body)
// // contentTemplateId
// // principalTemplateId
// // to
// // from
// // actions
