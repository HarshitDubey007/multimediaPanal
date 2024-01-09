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
import EntityCrud from "./EntityCrud";
import DaynmicApicall from "../../utils/function";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SendSms() {
  const [rowData, setRowData] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [getrows, setrows] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleEntityModel = (row) => {
    setRowData(row);
    setModalOpen(true);
  };

  const handleEntityClose = () => {
    setModalOpen(false);
  };

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
            handleEntityModel(params.row);
          }}
          showInMenu
        />,

        <GridActionsCellItem label="Delete" onClick={(e) => {}} showInMenu />,
      ],
    },
  ];

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
                    <Grid item>Manage Client Entity</Grid>
                    <Grid item>
                      <SoftButton
                        variant="contained"
                        size="small"
                        color="dark"
                        py={1}
                        onClick={() => {
                          handleEntityModel(null);
                        }}
                      >
                        Create Client Entity
                      </SoftButton>
                    </Grid>
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
          <Grid>
            <Dialog
              sx={{ mt: 2 }}
              open={isModalOpen}
              onClose={handleEntityClose}
              maxWidth="lg"
              fullWidth
            >
              <DialogContent>
                {/* user crud */}
                <EntityCrud entityData={rowData} />
              </DialogContent>
              <DialogActions>
                <SoftButton onClick={handleEntityClose}>Cancel</SoftButton>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
