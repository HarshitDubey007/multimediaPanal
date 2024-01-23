import React, { useEffect, useState } from "react";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";
import SoftBox from "../../components/SoftBox";
import DynamicApiCall from "../../utils/function";

export default function UserCrud({ userData }) {
  console.log("userData", userData);

  const [initial, setinitial] = useState({
    userid: "",
    username: "",
    usergroup: "",
    userright: "",
    campaignids: "",
    userrole: "",
    verifier: "",
    lockstatus: true,
    keypointer: "",
    loginstatus: true,
    active: true,
    remarks: "",
    createdby: "ADMIN",
    languagename: "ENGLISH",
    action_name: "INSERT",
  });

  const JsonFields = {
    data: [
      {
        name: "templateid",
        placeholder: "template Id",
        validation: Yup.string().required("Template Id is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "templatename",
        placeholder: "templatename Name",
        validation: Yup.string().required("Client Name is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "senderid",
        placeholder: "Sender id",
        validation: Yup.string().required("senderid Code is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "tempbody",
        placeholder: "tempbody",
        validation: Yup.string().required("tempbody is required"),
        type: "text",
        fullWidth: true,

      },
      {
        name: "remarks",
        placeholder: "remarks",
        // validation: Yup.string().required("remarks is required"),
        type: "text",
        fullWidth: true,

      },
    ],
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

  return (
    <>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <h6>{userData ? userData.action_name : initial.action_name} USER</h6>
      </SoftBox>
      <DynamicForm
        submitfunction={formsubmit}
        initialValues={userData ? userData : initial}
        fields={JsonFields}
      />
    </>
  );
}
