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

export default function ManageEntity() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [entityData, setEntityData] = useState("");
  const [getrows, setrows] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [initial, setinitial] = useState({
    peid: "",
    client_name: "",
    client_code: "",
    office_address: "",
    status: "Y",
    userid: userid,
    remarks: "",
    action_name: "INSERT"
  });

  useEffect(() => {
    (async () => {
      try {
        const Info = await DynamicApiCall("sms/getentity", "get", token);
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
        name: "peid",
        placeholder: "Entity Id",
        validation: Yup.string().required("Entity Id is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "client_name",
        placeholder: "Client Name",
        validation: Yup.string().required("Client Name is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "client_code",
        placeholder: "Client Code",
        validation: Yup.string().required("Client Code is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "office_address",
        placeholder: "Office Address",
        // validation: Yup.string().required("Office Code is required"),
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
    const apiUrl = "sms/manageentity";
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
