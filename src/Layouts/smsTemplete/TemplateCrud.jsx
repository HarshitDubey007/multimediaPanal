import React, { useEffect, useState } from "react";
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
    const [initial, setinitial] = useState({
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
    });
    console.log("tempData", tempData);

    const getPidData = async () => {
        try {
            const clientOptionsResponse = await DynamicApiCall("multimedia/getcamplist", "get", token);
            let clientdata = clientOptionsResponse.data.map((option) => ({
                value: option.camp_id,
                name: option.camp_name,
                peid: option.peid
            }))
            // console.log("clientdata:: ", clientdata)
            setClientOptions(clientdata);
            setClientOptionsLoading(false);
        } catch (error) {
            console.error("Error fetching client options:", error.message);
        }
    };

    const getSendarData = async () => {
        try {
            const clientOptionsResponse = await DynamicApiCall("sms/getsender", "get", token);
            let clientdata = clientOptionsResponse.data.map((option) => ({
                value: option.peid,
                name: option.peid,
            }))
            // console.log("clientdata:: ", clientdata)
            setSendarOptions(clientdata);
            // setClientOptionsLoading(false);
        } catch (error) {
            console.error("Error fetching client options:", error.message);
        }
    }


    useEffect(() => {
        (async () => {
            try {
                await getPidData()
                await getSendarData()
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        })();
    }, []);

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
                placeholder: "dlt_success",
                validation: Yup.string().required("dlt_success is required"),
                type: "text",
            },
            remarks: {
                name: "remarks",
                placeholder: "remarks",
                type: "text",
            },
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

    async function formsubmit(values) {
        const apiUrl = "user/manageuser";
        const method = "post";
        const modifiedValues = prepareFormValues(values);
        try {
            const apiResponse = await DynamicApiCall(apiUrl, method, modifiedValues);
            console.log("API Response:", apiResponse);
        } catch (error) {
            console.error("API Error:", error);
        }
    }

    function prepareFormValues(values) {
        const userRights = values.userright
            .map((v) => parseInt(v.value))
            .toString()
            .replace(/,/g, "");
        const campaignIds = JSON.stringify(
            values.campaignids.map((v) => parseInt(v.value))
        );

        return {
            ...values,
            userright: userRights,
            campaignids: campaignIds,
            usergroup: values.usergroup.name,
            lockstatus: values.lockstatus !== true ? 0 : 1,
            loginstatus: values.loginstatus !== true ? 0 : 1,
            active: values.active !== true ? "N" : "Y",
        };
    }

    function peidOnFOrm() {

    }

    const formik = useFormik({
        initialValues: JsonFields.initialValue,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            // submitfunction(values);
        },
    });

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
                    getOptionLabel={(option) => option.name}
                    placeholder={JsonFields.data.campid.placeholder}
                    value={formik.values[JsonFields.data.campid.name]}
                    onChange={(event, value) => {
                        formik.setFieldValue(JsonFields.data.campid.name, value)
                        formik.setFieldValue(JsonFields.data.peid.name, value ? value.peid : "")
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
                    getOptionLabel={(option) => option.name}
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
                    fullWidth={JsonFields.data.dlt_success.fullWidth ? JsonFields.data.dlt_success.fullWidth : false}
                    value={formik.values[JsonFields.data.dlt_success.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.dlt_success.name, value)}
                    placeholder={JsonFields.data.dlt_success.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.dlt_success.name, true)}
                    error={formik.touched[JsonFields.data.dlt_success.name] && !!formik.errors[JsonFields.data.dlt_success.name]}
                    helperText={
                        formik.touched[JsonFields.data.dlt_success.name] && formik.errors[JsonFields.data.dlt_success.name]
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
                    fullWidth={JsonFields.data.tempbody.fullWidth}
                    value={formik.values[JsonFields.data.tempbody.name]}
                    onChange={(value) => formik.setFieldValue(JsonFields.data.tempbody.name, value)}
                    placeholder={JsonFields.data.tempbody.placeholder || ""}
                    onBlur={() => formik.setFieldTouched(JsonFields.data.tempbody.name, true)}
                    error={formik.touched[JsonFields.data.tempbody.name] && !!formik.errors[JsonFields.data.tempbody.name]}
                    helperText={
                        formik.touched[JsonFields.data.tempbody.name] && formik.errors[JsonFields.data.tempbody.name]
                    }
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