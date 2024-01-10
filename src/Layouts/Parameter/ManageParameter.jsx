import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftTypography from "../../components/SoftTypography";
import SoftBox from "../../components/SoftBox";
import CustomTable from "../../formControl/Table";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";
import DynamicApiCall from "../../utils/function";
import { useSelector } from "react-redux";
import MultiSelect from "../../formControl/MultiSelect";
import { GridActionsCellItem } from "@mui/x-data-grid";

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

// one Peid have multipaal sender ids
const rows = [
  {
    paracode: "1",
    paradesc: "",
    paravalue: "",
    paraprop: "",
    isactive: "",
    action_name: "",
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

export default function ManageParameter() {
  const [masterParaProp, setMasterParaProp] = useState([]);
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  // console.log("userInfo:: ", userInfo)

  const [rowData, setRowData] = useState("");
  const [updateRow, setUpdateRow] = useState("");
  const [initial, setinitial] = useState({
    paracode: "",
    paradesc: "",
    paravalue: "",
    paraprop: "",
    isactive: true,
    action_name: "INSERT",

    // {
    //     "paracode": "DISPOSITION-GREEN",
    //     "paravalue": "D",
    //     "paradesc": "CRM DISPOSITION SCRIPT",
    //     "active_status": 1,
    //     "paraprop": "SCRIPT-CATEGORY",
    //     "action_name": "UPDATE"
    // }
  });

  useEffect(() => {
    (async () => {
      try {
        await DynamicApiCall(
          `multimedia/getparameterall/PARA_CODE/PARA_PROP`,
          "get",
          token
        ).then((res) => {
          setMasterParaProp(res.data);
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    })();
  }, []);

  async function getParameter(paraprop) {
    const Info = await DynamicApiCall(
      `multimedia/getParamdata/ALL/${paraprop}/mmadmin`,
      "get",
      token
    );
    console.log("Info.results:: ", Info);
    setRowData(Info.data);
  }

  const JsonFields = {
    data: [
      {
        fullWidth: true,
        name: "paracode",
        placeholder: "Para Code",
        validation: Yup.string().required("Para Code is required"),
        type: "text",
      },
      {
        fullWidth: true,
        name: "paraprop",
        placeholder: "Para Prop",
        validation: Yup.string().required("Para Prop is required"),
        type: "text",
      },
      {
        fullWidth: true,
        name: "paravalue",
        placeholder: "Para Value",
        validation: Yup.string().required("Para Group is required"),
        type: "text",
      },
      {
        fullWidth: true,
        name: "paradesc",
        placeholder: "Para Desc",
        validation: Yup.string().required("Para Desc is required"),
        type: "text",
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

  let columns = [
    { field: "paracode", headerName: "paracode", minWidth: 50, flex: 1 },
    { field: "paradesc", headerName: "paradesc", minWidth: 50, flex: 1 },
    { field: "paravalue", headerName: "paravalue", minWidth: 50, flex: 1 },
    { field: "paraprop", headerName: "paraprop", minWidth: 50, flex: 1 },
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
            params.row.action_name = console.log("params.row.:", params.row);
            let obj = {
              ...params.row,
              isactive: params.row.active_status,
              action_name: "UPDATE",
            };
            delete obj.active_status;
            setUpdateRow(obj);
          }}
          showInMenu
        />,

        <GridActionsCellItem label="Delete" onClick={(e) => {}} showInMenu />,
      ],
    },
  ];

  async function formsubmit(values) {
    const apiUrl = "";
    const method = "post";
    // const modifiedValues = prepareFormValues(values);

    console.log("values:: ", values);
    // try {
    //     const apiResponse = await DynamicApiCall(apiUrl, method, initial);
    //     console.log("API Response:", apiResponse);
    // } catch (error) {
    //     console.error("API Error:", error);
    // }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} mt={1} alignItems="center"></Grid>
      <MultiSelect
        key="parameter"
        multiple={false}
        options={masterParaProp}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => {
          getParameter(value.name);
        }}
      />
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
                  <SoftTypography variant="h6">Manage Parameter</SoftTypography>
                </SoftBox>
                <SoftBox>
                  <CustomTable
                    rows={rowData}
                    columns={columns}
                    uniquekey="paracode"
                  />
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
              <h6>Manage Parameter</h6>
            </SoftBox>
            <Grid spacing={2} mt={2}>
              <DynamicForm
                submitfunction={formsubmit}
                initialValues={updateRow ? updateRow : initial}
                fields={JsonFields}
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
