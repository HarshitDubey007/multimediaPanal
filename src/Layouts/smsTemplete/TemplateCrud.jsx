import React, { useEffect, useRef, useState } from "react";
import DynamicForm from "../../helpers/formikForm";
import SoftBox from "../../components/SoftBox";
import DynamicApiCall from "../../utils/function";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ValidatedTextArea from "../../formControl/ValidatedTextArea";
import { ColorSwitch } from "../../formControl/SwitchButton";
import SoftButton from "../../components/SoftButton";
import MultiSelect from "../../formControl/MultiSelect";
import ValidatedTextField from "../../formControl/ValidatedTextField";

export default function TemplateCrud({ tempData }) {
    const { userInfo } = useSelector((state) => state?.user?.value);
    const { userid, token } = userInfo;
    const [clientOptionsLoading, setClientOptionsLoading] = useState(true);
    const [clientOptions, setClientOptions] = useState([]);
    const [sendarOptions, setSendarOptions] = useState([]);

    const isFirstRender = useRef(true);
    const [initial, setinitial] = useState({
        templateid: "",
        templatename: "",
        peid: "",
        senderid: "",
        tempbody: "",
        temptype: "",
        tempvariables: "",
        campid: "",
        remarks: "",
        dlt_success: "Y",
        status: "Y",
        userid: userid,
        action_name: "INSERT"
    });


    const JsonFields = {
        initialValue: {
            templateid: "",
            templatename: "",
            peid: "",
            senderid: "",
            tempbody: "",
            temptype: "",
            tempvariables: "",
            campid: "",
            dlt_success: "",
            remarks: "",
            status: "Y",
            userid: userid,
            action_name: "INSERT"
        },
        data: {
            campid: {
                name: "campid",
                placeholder: "campid",
                multiple: false,
                type: "multiSelect",
                options: clientOptions,
                validation: Yup.string().required("campid is required"),
            },
            templateid: {
                name: "templateid",
                placeholder: "template Id",
                validation: Yup.string().required("Template Id is required"),
                type: "text",
            },
            templatename: {
                name: "templatename",
                placeholder: "template Name",
                validation: Yup.string().required("Template Name is required"),
                type: "text",
            },
            peid: {
                name: "peid",
                placeholder: "Peid",
                type: "text",
            },
            temptype: {
                name: "temptype",
                placeholder: "Temp Type",
                validation: Yup.string().required("Template type is required"),
                type: "text",
            },
            senderid: {
                name: "senderid",
                placeholder: "Sender id",
                multiple: false,
                type: "multiSelect",
                options: sendarOptions,
                validation: Yup.object().required("Sender id is required"),
            },
            tempbody: {
                fullWidth: true,
                name: "tempbody",
                placeholder: "Template body",
                validation: Yup.string().required("Template Body is required"),
                type: "textarea",
            },
            tempvariables: {
                name: "tempvariables",
                placeholder: "Template variables",
                validation: Yup.string().required("Template variables is required"),
                type: "text",
            },
            dlt_success: {
                name: "dlt_success",
                label: "dlt_success",
                placeholder: "dlt_success",
                // validation: Yup.boolian ().required("dlt_success is required"),
                type: "text",
            },
            remarks: {
                name: "remarks",
                placeholder: "remarks",
                type: "text",
            },
            status: {
                name: "status",
                label: "Status",
                placeholder: "status",
                type: "switch",
            }
        },
        buttons: {
            className: "space-around",
            submitButton: {
                style: {},
                label: "Save Template",
            },
            resetButton: {
                style: {},
                label: "Clear",
            },
        },
    };

    const getPidData = async () => {
        try {
            const clientOptionsResponse = await DynamicApiCall("multimedia/getcamplist", "get", token);
            let clientdata = clientOptionsResponse.data.map((option) => ({
                value: option.camp_id.toString(),
                name: option.camp_name,
                peid: option.peid
            }))
            setClientOptions(clientdata);
            setClientOptionsLoading(false);
        } catch (error) {
            console.error("Error fetching client options:", error.message);
        }
    };

    const getSendarData = async (campid) => {
        try {
            const clientOptionsResponse = await DynamicApiCall(`sms/getsender/${campid}`, "get", token);
            const clientdata = clientOptionsResponse.data.map((option) => ({
                value: option.senderid.toString(),
                name: option.senderid,
            }));

            await Promise.all([
                setSendarOptions(clientdata),
            ]);
        } catch (error) {
            console.error("Error fetching client options:", error.message);
        }
    };

    const formik = useFormik({
        initialValues: tempData ? tempData : JsonFields.initialValue,
        onSubmit: async (values) => {
            let modifiedValues = {
                ...values,
                campid: values.campid.value,
                senderid: values.senderid.value,
                dlt_success: values.dlt_success === true || values.dlt_success === "Y" ? "Y" : "N",
                status: values.status === true || values.status === "Y" ? "Y" : "N"
            }
            const apiUrl = "sms/managetemplate";
            const method = "post";

            try {
                const apiResponse = await DynamicApiCall(apiUrl, method, token, modifiedValues);
                console.log("API Response:", apiResponse);
            } catch (error) {
                console.error("API Error:", error);
            }
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (tempData) {
                    await getSendarData(tempData.peid);
                    console.log("getSender.peid::: ", sendarOptions);
                }
                await getPidData();
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();

    }, [])


    useEffect(() => {
        (async () => {
            try {
                if (tempData) {
                    formik.setValues((values) => ({
                        ...values,
                        ...tempData,
                        campid: clientOptions.find(option => option.value === tempData.campid) || null,
                        senderid: sendarOptions.find(option => option.value === tempData.senderid) || null,
                        status: tempData.status === "Y",
                        dlt_success: tempData.dlt_success === "Y",
                    }));

                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        })();
    }, [clientOptions]);

    return (
        <>
            <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
            >
                <h6>{tempData ? tempData.action_name : initial.action_name} Template</h6>
            </SoftBox>
            <form onSubmit={formik.handleSubmit}>
                <MultiSelect
                    key={JsonFields.data.campid.name}
                    multiple={JsonFields.data.campid.multiple}
                    options={JsonFields.data.campid.options}
                    getOptionLabel={(option) => option.name || ''}
                    placeholder={JsonFields.data.campid.placeholder}
                    value={formik.values[JsonFields.data.campid.name]}
                    onChange={(event, value) => {
                        console.log("value:: ", value)
                        formik.setFieldValue(JsonFields.data.campid.name, value)
                        formik.setFieldValue(JsonFields.data.peid.name, value ? value.peid : "")
                        getSendarData(value ? value.peid : "ALL")
                    }
                    }
                />
                {formik.touched[JsonFields.data.campid.name] && formik.errors[JsonFields.data.campid.name] && (
                    <div style={{ color: "red" }}>{formik.errors[JsonFields.data.campid.name]}</div>
                )}

                <ValidatedTextField
                    fullWidth={JsonFields.data.templateid.fullWidth ? JsonFields.data.templateid.fullWidth : false}
                    value={formik.values[JsonFields.data.templateid.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.templateid.name, value)}
                    placeholder={JsonFields.data.templateid.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.templateid.name, true)}
                    error={formik.touched[JsonFields.data.templateid.name] && !!formik.errors[JsonFields.data.templateid.name]}
                    helperText={
                        formik.touched[JsonFields.data.templateid.name] && formik.errors[JsonFields.data.templateid.name]
                    }
                />

                <MultiSelect
                    key={JsonFields.data.senderid.name}
                    multiple={JsonFields.data.senderid.multiple}
                    options={JsonFields.data.senderid.options}
                    getOptionLabel={(option) => option.name || ''}
                    placeholder={JsonFields.data.senderid.placeholder}
                    value={formik.values[JsonFields.data.senderid.name]}
                    onChange={(event, value) =>
                        formik.setFieldValue(JsonFields.data.senderid.name, value)
                    }
                />
                {formik.touched[JsonFields.data.senderid.name] && formik.errors[JsonFields.data.senderid.name] && (
                    <div style={{ color: "red" }}>{formik.errors[JsonFields.data.senderid.name]}</div>
                )}

                <ValidatedTextField
                    fullWidth={JsonFields.data.templatename.fullWidth ? JsonFields.data.templatename.fullWidth : false}
                    value={formik.values[JsonFields.data.templatename.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.templatename.name, value)}
                    placeholder={JsonFields.data.templatename.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.templatename.name, true)}
                    error={formik.touched[JsonFields.data.templatename.name] && !!formik.errors[JsonFields.data.templatename.name]}
                    helperText={
                        formik.touched[JsonFields.data.templatename.name] && formik.errors[JsonFields.data.templatename.name]
                    }
                />

                <ValidatedTextField
                    fullWidth={JsonFields.data.peid.fullWidth ? JsonFields.data.peid.fullWidth : false}
                    value={formik.values[JsonFields.data.peid.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.peid.name, value)}
                    placeholder={JsonFields.data.peid.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.peid.name, true)}
                    error={formik.touched[JsonFields.data.peid.name] && !!formik.errors[JsonFields.data.peid.name]}
                    helperText={
                        formik.touched[JsonFields.data.peid.name] && formik.errors[JsonFields.data.peid.name]
                    }
                />

                <ValidatedTextField
                    fullWidth={JsonFields.data.temptype.fullWidth ? JsonFields.data.temptype.fullWidth : false}
                    value={formik.values[JsonFields.data.temptype.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.temptype.name, value)}
                    placeholder={JsonFields.data.temptype.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.temptype.name, true)}
                    error={formik.touched[JsonFields.data.temptype.name] && !!formik.errors[JsonFields.data.temptype.name]}
                    helperText={
                        formik.touched[JsonFields.data.temptype.name] && formik.errors[JsonFields.data.temptype.name]
                    }
                />

                <ValidatedTextField
                    fullWidth={JsonFields.data.tempvariables.fullWidth ? JsonFields.data.tempvariables.fullWidth : false}
                    value={formik.values[JsonFields.data.tempvariables.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.tempvariables.name, value)}
                    placeholder={JsonFields.data.tempvariables.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.tempvariables.name, true)}
                    error={formik.touched[JsonFields.data.tempvariables.name] && !!formik.errors[JsonFields.data.tempvariables.name]}
                    helperText={
                        formik.touched[JsonFields.data.tempvariables.name] && formik.errors[JsonFields.data.tempvariables.name]
                    }
                />

                <ValidatedTextArea
                    colSize={500}
                    value={formik.values[JsonFields.data.tempbody.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.tempbody.name, value)}
                    placeholder={JsonFields.data.tempbody.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.tempbody.name, true)}
                    error={formik.touched[JsonFields.data.tempbody.name] && !!formik.errors[JsonFields.data.tempbody.name]}
                    helperText={
                        formik.touched[JsonFields.data.tempbody.name] && formik.errors[JsonFields.data.tempbody.name]
                    }
                />

                <ColorSwitch
                    label={JsonFields.data.dlt_success.label || ""}
                    checked={formik.values[JsonFields.data.dlt_success.name]}
                    onChange={(event, value) => {
                        formik.setFieldValue(JsonFields.data.dlt_success.name, value)
                    }}
                />

                <ColorSwitch
                    label={JsonFields.data.status.label || ""}
                    checked={formik.values[JsonFields.data.status.name]}
                    onChange={(event, value) => {
                        formik.setFieldValue(JsonFields.data.status.name, value)
                    }}
                />


                <Grid container my={2}>
                    <Grid container justifyContent={JsonFields.buttons.className}>
                        <SoftButton
                            variant="contained"
                            size="small"
                            color="dark"
                            type="reset"
                            onClick={formik.resetForm}
                        >
                            {JsonFields.buttons.resetButton.label}
                        </SoftButton>
                        <SoftButton
                            variant="contained"
                            size="small"
                            color="dark"
                            type="submit"
                        >
                            {JsonFields.buttons.submitButton.label}
                        </SoftButton>
                    </Grid>
                </Grid>
            </form>


        </>
    );
}





// data: [
//     {
//         name: "campid",
//         placeholder: "campid",
//         multiple: false,
//         type: "multiSelect",
//         options: clientOptions,
//         validation: Yup.string().required("campid is required"),
//     },
//     {
//         name: "templateid",
//         placeholder: "template Id",
//         validation: Yup.string().required("Template Id is required"),
//         type: "text",
//     },
//     {
//         name: "templatename",
//         placeholder: "template Name",
//         validation: Yup.string().required("Template Name is required"),
//         type: "text",
//     },
//     {
//         // multiple: false,
//         name: "Peid",
//         placeholder: "Peid",
//         type: "text",
//         // options: clientOptions,
//         // validation: Yup.object().required("Peid is required"),
//     },
//     {
//         name: "senderid",
//         placeholder: "Sender id",
//         multiple: false,
//         type: "multiSelect",
//         options: sendarOptions,
//         validation: Yup.object().required("Sender id is required"),
//     },
//     {
//         fullWidth: true,
//         name: "tempbody",
//         placeholder: "Template body",
//         validation: Yup.string().required("Template Body is required"),
//         type: "textarea",
//     },
//     {
//         name: "tempvariables",
//         placeholder: "Template variables",
//         validation: Yup.string().required("Template variables is required"),
//         type: "text",
//     },

//     {
//         name: "dlt_success",
//         placeholder: "dlt_success",
//         validation: Yup.string().required("dlt_success is required"),
//         type: "text",
//     },
//     {
//         name: "remarks",
//         placeholder: "remarks",
//         // validation: Yup.string().required("remarks is required"),
//         type: "text",


//     },
// ],