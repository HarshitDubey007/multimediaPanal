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
import SendSms from "./SendSms";
import SoftInput from "../../assets/theme/components/SoftInput";


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
    // const [isSmsSendModelOpen, setSmsSendModelOpen] = useState(false);
    const [isSendSmsModalOpen, setSendSmsModalOpen] = useState(false);
    const [getrows, setrows] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleUserModel = (row) => {
        setRowData(row);
        setModalOpen(true);
    };

    const handleCreateTemplateModelClose = () => {
        setModalOpen(false);
    };

    const handleSendsmsModelOpen = (row) => {
        setRowData(row);
        setSendSmsModalOpen(true)
    };

    const handleSendsmsModelClose = () => {
        setSendSmsModalOpen(false)

    }

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

                <GridActionsCellItem
                    label="Send Sms"
                    onClick={() => {
                        params.row.action_name = "UPDATE";
                        handleSendsmsModelOpen(params.row);
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
                            <SoftBox display="flex" flexDirection="row" justifyContent="flex-start" my={2}>
                                <Card style={{ width: "100%", padding: "10px" }}>
                                    <SoftTypography variant="h3" fontWeight="bold" color="info" textGradient>
                                        Template Upload
                                    </SoftTypography>
                                    <form>
                                        <SoftBox display="flex" flexDirection="row" justifyContent="flex-start" my={3}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={3}>
                                                    <SoftInput
                                                        size="medium"
                                                        icon={{ component: false, direction: "none" }}
                                                        success={false}
                                                        disabled={false}
                                                        margin="normal"
                                                        placeholder="Campid"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={3} mx={3}>
                                                    <SoftInput
                                                        size="medium"
                                                        icon={{ component: false, direction: "none" }}
                                                        success={false}
                                                        disabled={false}
                                                        margin="normal"
                                                        placeholder="Select a file"
                                                        type="file"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <SoftButton
                                                        type="button"
                                                        variant="gradient"
                                                        color="info"
                                                        // onClick={handleSubmit}
                                                        ml={2}
                                                    >
                                                        Upload
                                                    </SoftButton>
                                                </Grid>
                                            </Grid>

                                        </SoftBox>
                                    </form>
                                </Card>
                            </SoftBox>

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
                                        uniquekey="templateid"
                                    />
                                </Card>
                            </SoftBox>
                        </SoftBox>
                    </Grid>
                    <Grid>
                        <Dialog
                            sx={{ mt: 2 }}
                            open={isModalOpen}
                            onClose={handleCreateTemplateModelClose}
                            maxWidth="lg"
                            fullWidth
                        >
                            <DialogContent>
                                {/* Template crud */}
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCreateTemplateModelClose}
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
                        </Dialog>
                    </Grid>










                    {/* send live sms */}
                    <Grid>
                        <Dialog
                            sx={{ mt: 2 }}
                            open={isSendSmsModalOpen}
                            onClose={handleSendsmsModelClose}
                            maxWidth="md"
                            fullWidth
                        >
                            <DialogContent>
                                {/* Template crud */}
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

                                <h1>Send SMS</h1>

                                <SendSms
                                    tempData={rowData ? rowData : ""}
                                />
                            </DialogContent>
                        </Dialog>

                    </Grid>
                </Grid>
            </div>
        </>
    );
}
