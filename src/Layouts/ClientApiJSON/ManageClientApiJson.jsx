import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "../../components/SoftBox";
import CustomTable from "../../formControl/Table";
import Tooltip from "@mui/material/Tooltip";
import { MutedCell } from "../../formControl/TableCellLayouts/tableCellLayouts";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SoftButton from "../../components/SoftButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useSelector } from "react-redux";
import DaynmicApicall from "../../utils/function";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ClientApiCrud from "./ClientApiCrud";

export default function ManageClientApiJson() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [rowData, setRowData] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [getrows, setrows] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleUserModel = (row) => {
    setRowData(row);
    setModalOpen(true);
  };

  const handleSendsmsModelClose = () => {
    setModalOpen(false);
  };

  let columns = [
    {
      field: "api_id",
      headerName: "Api Id",
      minWidth: 100,
      renderCell: (params) =>
        params.value && (
          <Tooltip
            title={<MutedCell title={params.value} />}
            color="inherit"
            placement="bottom-start"
          >
            <span>
              <MutedCell title={params.value} />
            </span>
          </Tooltip>
        ),
    },
    {
      field: "camp_id:",
      headerName: "Campaign",
      minWidth: 100,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "apiurl",
      headerName: "API URL",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "apitoken_enable",
      headerName: "Api Token Enable",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "api_token",
      headerName: "API Token",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    {
      field: "api_req_payload",
      headerName: "Api Payload",
      minWidth: 200,
      flex: 1,
      headerClassName: "table-header",
      renderCell: (params) =>
        params.value && (
          <Tooltip
            title={<MutedCell title={JSON.stringify(params.value)} />}
            color="inherit"
            placement="bottom-start"
          >
            <span>
              <MutedCell title={JSON.stringify(params.value)} />
            </span>
          </Tooltip>
        ),
    },
    {
      field: "notify_url",
      headerName: "Notify URL",
      minWidth: 100,
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
            console.log("api_header_payload::: ", params.row)
            handleUserModel(params.row);
          }}
          showInMenu
        />,

        <GridActionsCellItem label="Delete" onClick={(e) => { }} showInMenu />,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const Info = await DaynmicApicall("sms/getclientapijson/ALL", "get", token);
        setrows(Info.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
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
                    <Grid item>Client APi JSON</Grid>
                    <Grid item>
                      <SoftButton
                        variant="contained"
                        size="small"
                        color="dark"
                        onClick={() => {
                          handleUserModel(null);
                        }}
                      >
                        Add Client API
                      </SoftButton>
                    </Grid>
                  </Grid>
                  <CustomTable
                    rows={getrows ? getrows : []}
                    columns={columns}
                    uniquekey="api_id"
                  />
                </Card>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid>
            <Dialog
              sx={{ mt: 2 }}
              open={isModalOpen}
              onClose={handleSendsmsModelClose}
              maxWidth="lg"
              fullWidth
            >
              <DialogContent>
                {/* user crud */}
                <IconButton
                  aria-label="close"
                  onClick={handleSendsmsModelClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <ClientApiCrud apiData={rowData} />
              </DialogContent>
              {/* <DialogActions>
                <SoftButton onClick={handleSendsmsModelClose}>
                  Cancel
                </SoftButton>
              </DialogActions> */}
            </Dialog>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
