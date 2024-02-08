import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from '../../components/SoftBox';
import DynamicForm from '../../helpers/formikForm';
import * as Yup from "yup";
import SoftButton from '../../components/SoftButton';
import DynamicApiCall from '../../utils/function';
import { useLocation } from 'react-router-dom';



export default function MmIndex() {
    const [clientOptions, setClientOptions] = useState([]);
    let path = useLocation()
    console.log("MmIndex::: ", path)
    let renderKey = 'ccsxeeret'
    const JsonFields = {
        initialValues: { peid: "" },
        data: [
            {
                multiple: false,
                name: "peid",
                placeholder: "Peid",
                type: "multiSelect",
                options: clientOptions,
                validation: Yup.object().required("Peid is required"),

            },
        ],
        buttons: {
            className: "space-around",
            submitButton: {
                style: {},
                label: "send sms",
            },
            resetButton: {
                style: { display: 'none' },
                label: "Clear",
            },
        },
    };

    useEffect(() => {
        gustUserLogin()
    }, [])

    async function gustUserLogin(values) {
        const apiUrl = `user/gustuselogin${path.pathname}`;
        const method = "get";
        try {
            const apiResponse = await DynamicApiCall(apiUrl, method).then(async (userInfo) => {
                let camp = path.pathname.slice(1, 4)
                // http://localhost:5001/api/user/gustuselogin/
                const clientOptionsResponse = await DynamicApiCall(`sms/getmastertemp/${camp}`, "get", userInfo?.data?.token);
                console.log("clientOptionsResponse: ", clientOptionsResponse)
                let clientdata = clientOptionsResponse?.data?.map((option) => ({
                    value: option.templateid,
                    name: option.templatename,
                }))
                setClientOptions(clientdata);
                console.log("apiResponse:: ", clientdata, clientOptionsResponse) 

            })
            // console.log("API Response:", apiResponse);
            // setUserInfo(apiResponse)
        } catch (error) {
            console.error("API Error:", error);
        }
    }


    const sendSms = (values) => {

    }

    return (
        <>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={12} lg={6}>
                    <SoftBox mt={1}>
                        <SoftBox mb={3}>
                            <Card style={{ padding: "10px" }}>
                                <Grid container justifyContent="space-between" px={2} pt={1}>
                                    <Grid item>
                                        Send SMS
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
                                    <DynamicForm
                                        submitfunction={sendSms}
                                        initialValues={JsonFields.initialValues}
                                        fields={JsonFields}
                                    />
                                )}
                            </Card>
                        </SoftBox>
                    </SoftBox>
                </Grid>
            </Grid>
        </>
    );
}