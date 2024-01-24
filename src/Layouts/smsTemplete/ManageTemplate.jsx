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
import TemplateCrud from "./TemplateCrud";
import { useSelector } from "react-redux";
import DaynmicApicall from "../../utils/function";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SoftTypography from "../../components/SoftTypography";


function Function({ title }) {
    return (
        <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="caption" fontWeight="medium" color="text">
                {title}
            </SoftTypography>
        </SoftBox>
    );
}


export default function ManageTemplate() {
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
        {
            field: "tempbody",
            headerName: "Tempplete body",
            minWidth: 200,
            renderCell: (params) =>
                params.value && (
                    <Tooltip
                        title={<Function title={params.value} />}
                        color="inherit"
                        placement="bottom-start"
                    >
                        <span>
                            <Function title={params.value} />
                        </span>
                    </Tooltip>
                ),
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
                const Info = await DaynmicApicall("sms/getmastertemp/ALL", "get", token);
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
                                        <Grid item>Manage Template</Grid>
                                        <Grid item>
                                            <SoftButton
                                                variant="contained"
                                                size="small"
                                                color="dark"
                                                onClick={() => {
                                                    handleUserModel(null);
                                                }}
                                            >
                                                Create Template
                                            </SoftButton>
                                        </Grid>
                                    </Grid>
                                    <CustomTable
                                        rows={getrows ? getrows : []}
                                        columns={columns}
                                        uniquekey="userid"
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
                                <TemplateCrud tempData={rowData ? rowData : ""} />
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
