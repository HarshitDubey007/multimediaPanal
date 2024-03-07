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
import { useSelector } from "react-redux";
import * as Yup from "yup";
import DynamicApiCall from "../../utils/function";
import DynamicSideForm from "../../helpers/formikSideForm";

export default function ManageSender() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [senderData, setSenderData] = useState("");
  const [clientOptions, setClientOptions] = useState([]);

  const [getrows, setrows] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [initial, setinitial] = useState({
    senderid: "",
    sendername: "",
    peid: { value: "", name: "" },
    owner_name: "",
    remarks: "",
    status: "Y",
    userid: userid,
    action_name: "INSERT",
  });

  useEffect(() => {
    (async () => {
      try {
        const Info = await DynamicApiCall("sms/getsender/ALL", "get", token);
        setrows(Info.data);
        getPidData();
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    })();
  }, []);

  const getPidData = async () => {
    try {
      const clientOptionsResponse = await DynamicApiCall(
        "sms/getentity",
        "get",
        token
      );
      let clientdata = clientOptionsResponse.data.map((option) => ({
        value: option.peid.toString(),
        name: option.client_name,
      }));
      setClientOptions(clientdata);
    } catch (error) {
      console.error("Error fetching client options:", error.message);
    }
  };

  let columns = [
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
              status: params.row.is_active,
            };
            delete editData.updated_on;
            delete editData.updated_by;
            delete editData.created_on;
            delete editData.sno;
            delete editData.is_active;
            console.log("editData", editData);
            setSenderData(editData);
          }}
          showInMenu
        />,
        <GridActionsCellItem label="Delete" onClick={(e) => {}} showInMenu />,
      ],
    },
    {
      field: "peid",
      headerName: "Peid(Principal Entity)",
      minWidth: 200,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "senderid",
      headerName: "Sender",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "owner_name",
      headerName: "Owner name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 80,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      minWidth: 180,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "created_on",
      headerName: "Created On",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
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
        multiple: false,
        name: "peid",
        placeholder: "Peid",
        type: "multiSelect",
        options: clientOptions,
        validation: Yup.object().required("Peid is required"),
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
        placeholder: "Remarks",
        // validation: Yup.string().required("remarks is required"),
        type: "text",
        fullWidth: true,
      },
    ],
    buttons: {
      className: "space-around",
      submitButton: {
        style: {},
        label: "Save Sender",
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
      const postData = {
        ...values,
        peid: values.peid.value,
        status: "Y",
      };
      console.log("managesender values:: ", postData);

      const apiResponse = await DynamicApiCall(apiUrl, method, token, postData);
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
                    height: "100%",
                    width: "100%",
                    "& .table-header": {
                      fontWeight: "bold !important",
                      color: "#6c757d",
                    },
                  }}
                >
                  <Grid container justifyContent="space-between" px={2} py={1}>
                    <Grid item>Manage Sender</Grid>
                  </Grid>
                  <CustomTable
                    rows={getrows ? getrows : []}
                    columns={columns}
                    uniquekey="sno"
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
                      {senderData ? senderData.action_name : "Add"} Sender
                    </Grid>
                  </Grid>
                  <hr
                    style={{
                      backgroundColor: "#e8e5e5",
                      margin: "0 auto",
                      width: "100%",
                    }}
                  />

                  {clientOptions.length > 0 && (
                    <DynamicSideForm
                      submitfunction={formsubmit}
                      initialValues={senderData ? senderData : initial}
                      fields={JsonFields}
                      setActionName={setSenderData}
                    />
                  )}
                </Card>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
