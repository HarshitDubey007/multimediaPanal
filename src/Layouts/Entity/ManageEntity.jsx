import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import SoftBox from "../../components/SoftBox";
import CustomTable from "../../formControl/Table";
import Tooltip from "@mui/material/Tooltip";
import { MutedCell } from "../../formControl/TableCellLayouts/tableCellLayouts";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";
import DynamicApiCall from "../../utils/function";

export default function SendSms() {
  const [rowData, setRowData] = useState("");
  const [entityData, setEntityData] = useState("");
  const [getrows, setrows] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [initial, setinitial] = useState({
    peid: "",
    peidName: "",
    remarks: "",
  });

  useEffect(() => {
    (async () => {
      try {
        // const Info = await DaynmicApicall("sms/getentity", "get");
        // console.log("Info.results:: ", Info.data);
        // setrows(Info.data);
        setrows([
          {
            peid: "ADMIN",
            peidName: "ADMIN",
            remarks: "New",
            created_on: "2023-12-21",
            is_active: "Y",
          },
          {
            peid: "AGENT",
            peidName: "AGENT",
            remarks: "New1",
            created_on: "2023-12-22",
            is_active: "N",
          },
        ]);
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
    {
      field: "peidName",
      headerName: "Principal Entity name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "remarks",
      headerName: "Username",
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
            setEntityData(params.row);
          }}
          showInMenu
        />,

        <GridActionsCellItem label="Delete" onClick={(e) => {}} showInMenu />,
      ],
    },
  ];

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
        name: "remarks",
        placeholder: "User Name",
        validation: Yup.string().required("remarks is required"),
        type: "text",
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
                <Card style={{ paddingRight: "10px" }}>
                  <Grid container justifyContent="space-between" px={2} pt={1}>
                    <Grid item>
                      {entityData ? entityData.action_name : "ADD"} USER ENTITY
                    </Grid>
                  </Grid>
                  {/* <Divider variant="fullWidth" /> */}

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
