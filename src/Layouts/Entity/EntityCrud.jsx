import React, { useEffect, useState } from "react";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";
import SoftBox from "../../components/SoftBox";
import DynamicApiCall from "../../utils/function";

export default function EntityCrud({ entityData }) {
  console.log("In EntityCrud", entityData);
  const [initial, setinitial] = useState({
    peid: "",
    peidName: "",
    remarks: "",
  });

  const JsonFields = {
    data: [
      {
        multiple: false,
        name: "peid",
        placeholder: "Entity Id",
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
        name: "remarks",
        placeholder: "User Name",
        validation: Yup.string().required("remarks is required"),
        type: "text",
      },
    ],
    buttons: {
      submitButton: {
        style: {},
        label: "Create Entity",
      },
    },
  };

  async function formsubmit(values) {
    const apiUrl = "";
    const method = "post";
    // const modifiedValues = prepareFormValues(values);
    try {
      const apiResponse = await DynamicApiCall(apiUrl, method, initial);
      console.log("API Response:", apiResponse);
    } catch (error) {
      console.error("API Error:", error);
    }
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
        <h6>
          {entityData ? entityData.action_name : initial.action_name} USER
          ENTITY
        </h6>
      </SoftBox>
      <DynamicForm
        submitfunction={formsubmit}
        initialValues={entityData ? entityData : initial}
        fields={JsonFields}
      />
    </>
  );
}
