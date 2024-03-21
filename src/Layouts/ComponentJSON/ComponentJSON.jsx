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
import ComponentJsonCrud from "./ComponentJsonCrud";
import { useSelector } from "react-redux";
import DaynamicApicall from "../../utils/function";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ComponentJSON() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [rowData, setRowData] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [getrows, setrows] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleComponentModel = (row) => {
    const rowData = {
      ...row,
      comp_json: JSON.stringify(row?.comp_json),
      is_active: row?.is_active === "N" ? false : true,
    };
    setRowData(rowData);
    setModalOpen(true);
  };

  const handleComponentModelClose = () => {
    setModalOpen(false);
    setRowData("");
    getComponentJson();
  };

  let columns = [
    {
      field: "object_name",
      headerName: "S.No.",
      width: 60,
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
      field: "menu_id",
      headerName: "Menu ID",
      width: 190,
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
      field: "menu_name",
      headerName: "Menu Name",
      width: 180,
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
      field: "menu_display_name",
      headerName: "Menu Display Name",
      width: 180,
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
      field: "parent_id",
      headerName: "Menu Parent",
      width: 110,
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
      field: "menu_type",
      headerName: "Menu Type",
      width: 100,
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
      field: "url",
      headerName: "Image URL",
      width: 100,
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
      field: "is_active",
      headerName: "Active",
      width: 60,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          onClick={() => {
            params.row.action_name = "UPDATE";
            handleComponentModel(params.row);
          }}
          showInMenu
        />,

        <GridActionsCellItem label="Delete" onClick={(e) => {}} showInMenu />,
      ],
    },
  ];

  const getComponentJson = async () => {
    try {
      const Info = await DaynamicApicall(
        "multimedia/getallmenumaster",
        "get",
        token
      );
      setrows(Info.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getComponentJson();
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
                    height: "100%",
                    width: "100%",
                    "& .table-header": {
                      fontWeight: "bold !important",
                      color: "#6c757d",
                    },
                  }}
                >
                  <Grid container justifyContent="space-between" px={2} py={1}>
                    <Grid item>Component JSON</Grid>
                    <Grid item>
                      <SoftButton
                        variant="contained"
                        size="small"
                        color="dark"
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        Add Component JSON
                      </SoftButton>
                    </Grid>
                  </Grid>
                  <CustomTable
                    rows={getrows ? getrows : []}
                    columns={columns}
                    uniquekey="object_name"
                  />
                </Card>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid>
            <Dialog
              sx={{ mt: 2 }}
              open={isModalOpen}
              onClose={handleComponentModelClose}
              maxWidth="lg"
              fullWidth
            >
              <DialogContent>
                {/* user crud */}
                <IconButton
                  aria-label="close"
                  onClick={handleComponentModelClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <ComponentJsonCrud
                  compData={rowData}
                  setModalOpen={handleComponentModelClose}
                  menuParent={getrows}
                />
              </DialogContent>
              {/* <DialogActions>
                <SoftButton onClick={handleComponentModelClose}>
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
