import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "../../components/SoftBox";
import CustomTable from "../../formControl/Table";
import { MutedCell } from "../../formControl/TableCellLayouts/tableCellLayouts";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DynamicForm from "../../helpers/formikForm";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import DynamicApiCall from "../../utils/function";

export default function ManageCampaign() {
    const { userInfo } = useSelector((state) => state?.user?.value);
    const { userid, token } = userInfo;
    const [campData, setCampData] = useState("");
    const [clientOptions, setClientOptions] = useState([]);
    const [clientOptionsLoading, setClientOptionsLoading] = useState(true);
    const [getrows, setrows] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [initial, setinitial] = useState({
        campid: "",
        campname: "",
        clientname: "",
        senderid: "",
        campdisplay_name: "",
        remarks: "",
        status: "Y",
        userid: userid,
        action_name: "INSERT",


    });


    useEffect(() => {
        (async () => {
            try {
                await fetchData()
                const Info = await DynamicApiCall("multimedia/getcamplist", "get", token);
                setrows(Info.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        })();
    }, []);


    const fetchData = async () => {
        try {
            const clientOptionsResponse = await DynamicApiCall("multimedia/getcamplist", "get", token);
            let clientdata = clientOptionsResponse.data.map((option) => ({
                value: option.camp_name,
                name: option.peid,
            }))
            // console.log("clientdata:: ", clientdata)
            setClientOptions(clientdata);
            setClientOptionsLoading(false);
        } catch (error) {
            console.error("Error fetching client options:", error.message);
        }
    };


    let columns = [
        {
            field: "sno",
            headerName: "SNO",
            minWidth: 30,
            renderCell: (params) =>
                params.value && <MutedCell title={params.value} org="Organization" />,
        },
        {
            field: "camp_id",
            headerName: "Campaign Id",
            minWidth: 80,
            renderCell: (params) =>
                params.value && <MutedCell title={params.value} org="Organization" />,
        },
        {
            field: "camp_name",
            headerName: "Camp name",
            minWidth: 150,
            flex: 1,
            renderCell: (params) =>
                params.value && <MutedCell title={params.value} org="Organization" />,
        },
        {
            field: "client_name",
            headerName: "clientname",
            minWidth: 200,
            flex: 1,
            renderCell: (params) =>
                params.value && <MutedCell title={params.value} org="Organization" />,
        },
        {
            field: "sender_id",
            headerName: "senderid",
            minWidth: 150,
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
            minWidth: 200,
            flex: 1,
            renderCell: (params) =>
                params.value && <MutedCell title={params.value} org="Organization" />,
        },
        {
            field: "is_active",
            headerName: "Is Active",
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
                        console.log("Parames row", params.row)
                        let editData = {
                            // action_name: "UPDATE",
                            // camp_display_name: "",
                            // camp_id: "",
                            // camp_name: "",
                            // client_name: "",
                            // is_active: "",
                            // peid: "",
                            // remarks: "",
                            // sno: "",

                            campid: params.row.camp_id,
                            campname: params.row.camp_name,
                            clientname: params.row.peid,
                            senderid: params.row.sender_id,
                            campdisplay_name: params.row.camp_display_name,
                            remarks: params.row.remarks,
                            action_name: "UPDATE"

                        }
                        console.log("params.row.action_name = UPDATE", editData, params.row)
                        setCampData(editData)


                        // setCampData(editData);

                        // campid: "",
                        // campname: "",
                        // clientname: "",
                        // senderid: "",
                        // campdisplay_name: "",
                        // remarks: "",


                        // action_name: "UPDATE"camp_display_name: "TATAAI"camp_id: "111"camp_name: "TATA"client_name: "TATA"created_by: "P017002"created_on: "2024-01-22 15:52:20"is_active: "Y"peid: "PE12345"remarks: "TEST TATA"sender_id: "12132435t4"sno: 5
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
                name: "campid",
                placeholder: "Campaign Id",
                validation: Yup.string().required("Campaign Id is required"),
                type: "text",
                fullWidth: true,

            },
            {
                name: "campname",
                placeholder: "Campaign Name",
                validation: Yup.string().required("Campaign name is required"),
                type: "text",
                fullWidth: true,

            },
            {
                name: "campdisplay_name",
                placeholder: "Campaign display Name",
                validation: Yup.string().required("Campaign display name is required"),
                type: "text",
                fullWidth: true,

            },
            {
                multiple: false,
                name: "clientname",
                placeholder: "Client Name",
                type: "multiSelect",
                options: clientOptions,
                validation: Yup.object().required("Client name is required"),


                multiple: false,
                name: "usergroup",
                placeholder: "Select User Group",
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
                name: "senderid",
                placeholder: "senderid",
                validation: Yup.string().required("sender Id is required"),
                type: "text",
                fullWidth: true,

            },
            {
                name: "remarks",
                placeholder: "remarks",
                // validation: Yup.string().required("remarks is required"),
                type: "text",
            },
        ],
        buttons: {
            className: "space-around",
            submitButton: {
                style: {},
                label: "Save campaign",
            },
            resetButton: {
                style: {},
                label: "Clear",
            },
        },
    };

    async function formsubmit(values) {
        const apiUrl = "multimedia/managecamp";
        const method = "post";
        // const modifiedValues = prepareFormValues(values);
        try {
            let client = values.clientname
            values.peid = client.value
            values.clientname = client.name
            const apiResponse = await DynamicApiCall(apiUrl, method, token, values);
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
                                        <Grid item>Manage Campaign</Grid>
                                    </Grid>
                                    <CustomTable
                                        rows={getrows ? getrows : []}
                                        columns={columns}
                                        uniquekey="camp_id"
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
                                            {campData ? campData.action_name : "Add"} Campaign
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
                                        initialValues={campData ? campData : initial}
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









// [
//     {
//         "value": "1234567",
//         "name": "TATA"
//     },
//     {
//         "value": "12345677",
//         "name": "TATA"
//     },
//     {
//         "value": "333486455533",
//         "name": "AIRTEL"
//     },
//     {
//         "value": "123345",
//         "name": "HDFC!"
//     },
//     {
//         "value": "33344535533",
//         "name": "INFO"
//     }
// ]