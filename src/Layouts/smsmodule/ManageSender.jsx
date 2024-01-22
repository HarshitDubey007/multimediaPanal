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

export default function ManageSender() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [entityData, setEntityData] = useState("");
  const [getrows, setrows] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [initial, setinitial] = useState({
    senderid: "",
    sendername: "",
    peid: "",
    owner_name: "",
    remarks: "",
    status: "Y",
    userid: userid,
    action_name: "INSERT"

  });

  useEffect(() => {
    (async () => {
      try {

        const Info = await DynamicApiCall("sms/getsender", "get", token);
        console.log("Info.results:: ", Info.data);
        setrows(Info.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    })();
  }, []);

  let columns = [
    {
      field: "peid",
      headerName: "Peid(Principal Entity)",
      minWidth: 200,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    // {
    //   field: "peidName",
    //   headerName: "Principal Entity name",
    //   minWidth: 200,
    //   flex: 1,
    //   renderCell: (params) =>
    //     params.value && <MutedCell title={params.value} org="Organization" />,
    // },
    {
      field: "client_name",
      headerName: "Client name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "office_address",
      headerName: "Office address",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
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
            setEntityData(editData);
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
        name: "senderid",
        placeholder: "Sender Id",
        validation: Yup.string().required("Sender Id is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "sendername",
        placeholder: "Sender Name",
        validation: Yup.string().required("Sender name is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "peid",
        placeholder: "peid",
        validation: Yup.string().required("peid is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "owner_name",
        placeholder: "Owner name",
        validation: Yup.string().required("Owner Code is required"),
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
        label: "Save Entity",
      },
      resetButton: {
        style: {},
        label: "Clear",
      },
    },
  };

  async function formsubmit(values) {
    const apiUrl = "sms/managesender";
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
                    <Grid item>Manage Client Entity</Grid>
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
                      {entityData ? entityData.action_name : "Add"} User Entity
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
                    initialValues={entityData ? entityData : initial}
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
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import SoftTypography from "../../components/SoftTypography";
// import SoftBox from "../../components/SoftBox";
// import CustomTable from "../../formControl/Table";
// import DynamicApiCall from "../../utils/function";
// import DynamicForm from "../../helpers/formikForm";
// import * as Yup from "yup";

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

// let columns = [
//   {
//     field: "Peid",
//     headerName: "Principal Entity Identifier",
//     minWidth: 50,
//     flex: 1,
//   },
//   { field: "Sender", headerName: "Sender", minWidth: 50, flex: 1 },
//   { field: "Entity", headerName: "Entity", minWidth: 50, flex: 1 },
//   { field: "ApprovedOn", headerName: "ApprovedOn", minWidth: 50, flex: 1 },
//   { field: "Status", headerName: "Status", minWidth: 50, flex: 1 },
//   { field: "action", headerName: "action", minWidth: 50, flex: 1 },
// ];

// // one Peid have multipaal sender ids
// const rows = [
//   {
//     Peid: "2",
//     Sender: "ICCSAZ",
//     Entity: "120**********786",
//     ApprovedOn: `${new Date().toISOString().split("T")[0]}`,
//     Status: "Approved",
//     action: "Edit",
//   },
//   {
//     Peid: "3",
//     Sender: "ICCSAZ",
//     Entity: "120**********786",
//     ApprovedOn: `${new Date().toISOString().split("T")[0]}`,
//     Status: "Approved",
//     action: "Edit",
//   },
// ];

// function Author({ image, name, email }) {
//   return (
//     <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
//       {/* <SoftBox mr={2}>
//         <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
//       </SoftBox> */}
//       <SoftBox display="flex" flexDirection="column">
//         <SoftTypography variant="button" fontWeight="medium">
//           {name}
//         </SoftTypography>
//         {/* <SoftTypography variant="caption" color="secondary">
//           {email}
//         </SoftTypography> */}
//       </SoftBox>
//     </SoftBox>
//   );
// }

// function Function({ job, org }) {
//   return (
//     <SoftBox display="flex" flexDirection="column">
//       <SoftTypography variant="caption" fontWeight="medium" color="text">
//         {job}
//       </SoftTypography>
//       {/* <SoftTypography variant="caption" color="secondary">
//         {org}
//       </SoftTypography> */}
//     </SoftBox>
//   );
// }

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// // templateName: '',
// // templateId: '',
// // templateBody: '',
// // pid: '',

// export default function ManageSender() {
//   const [initial, setinitial] = useState({
//     peid: "",
//     peidName: "",
//     remarks: "",
//   });

//   async function formsubmit(values) {
//     const apiUrl = "";
//     const method = "post";
//     // const modifiedValues = prepareFormValues(values);
//     try {
//       const apiResponse = await DynamicApiCall(apiUrl, method, initial);
//       console.log("API Response:", apiResponse);
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   }

//   const JsonFields = {
//     data: [
//       {
//         multiple: false,
//         name: "peid",
//         placeholder: "Entity Id",
//         type: "multiSelect",
//         options: [
//           { value: "ADMIN", name: "ADMIN" },
//           { value: "SUPER-ADMIN", name: "SUPER-ADMIN" },
//           { value: "AGENT", name: "AGENT" },
//           { value: "TEM-LEAD", name: "TEM-LEAD" },
//         ],
//         validation: Yup.object().required("User Group is required"),
//       },
//       {
//         multiple: false,
//         name: "sender",
//         placeholder: "Entity Id",
//         type: "multiSelect",
//         options: [
//           { value: "ADMIN", name: "ADMIN" },
//           { value: "SUPER-ADMIN", name: "SUPER-ADMIN" },
//           { value: "AGENT", name: "AGENT" },
//           { value: "TEM-LEAD", name: "TEM-LEAD" },
//         ],
//         validation: Yup.object().required("User Group is required"),
//       },
//     ],
//     buttons: {
//       className: "space-around",
//       submitButton: {
//         style: {},
//         label: "Create Entity",
//       },
//       resetButton: {
//         style: {},
//         label: "Clear",
//       },
//     },
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2} mt={1} alignItems="center"></Grid>

//       <Grid container spacing={2}>
//         {/* tabel */}
//         <Grid item xs={12} md={8}>
//           <Card>
//             <SoftBox>
//               <SoftBox mb={3}>
//                 <SoftBox
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   p={3}
//                 >
//                   <SoftTypography variant="h6">Manage Sender</SoftTypography>
//                 </SoftBox>
//                 <SoftBox
//                 // sx={{
//                 //   "& .MuiTableRow-root:not(:last-child)": {
//                 //     "& td": {
//                 //       borderBottom: ({ borders: { borderWidth, borderColor } }) =>
//                 //         `${borderWidth[1]} solid ${borderColor}`,
//                 //     },
//                 //   },
//                 // }}
//                 >
//                   <CustomTable rows={rows} columns={columns} uniquekey="Peid" />
//                 </SoftBox>
//               </SoftBox>
//             </SoftBox>
//           </Card>
//         </Grid>

//         {/* form */}
//         <Grid item xs={12} md={4}>
//           <Card>
//             <SoftBox
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               pt={2}
//               px={2}
//             >
//               <h6>Add Sender</h6>
//             </SoftBox>
//             <Grid spacing={2} mt={2}>
//               {/* <form onSubmit={handleSubmit}>

//                 <ValidatedTextField
//                   name="sender"
//                   variant="outlined"
//                   size="small"
//                   placeholder="Principal Entity(PEID)"
//                   value={formData.ttype}
//                   onChange={(value) => handleInputChange('sender', value)}
//                 />
//                 <ValidatedTextField
//                   name="sender"
//                   variant="outlined"
//                   size="small"
//                   placeholder="Principal Entity Name"
//                   value={formData.ttype}
//                   onChange={(value) => handleInputChange('sender', value)}
//                 />

//                 <ValidatedTextField
//                   name="sender"
//                   variant="outlined"
//                   size="small"
//                   placeholder="Sender id"
//                   value={formData.ttype}
//                   onChange={(value) => handleInputChange('sender', value)}
//                 />


//                 <Grid item>
//                   <Button type="submit" color="primary">
//                     Submit
//                   </Button>
//                 </Grid>
//               </form> */}
//               <DynamicForm
//                 submitfunction={formsubmit}
//                 initialValues={initial}
//                 fields={JsonFields}
//               />
//             </Grid>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
