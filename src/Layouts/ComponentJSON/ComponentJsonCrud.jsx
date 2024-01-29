import React, { useEffect, useState } from "react";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";
import SoftBox from "../../components/SoftBox";
import DynamicApiCall from "../../utils/function";
import { useSelector } from "react-redux";


export default function ComponentJsonCrud({ apiData }) {
  const [componentOptions, setComponentOptions] = useState([]);
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  console.log("apiData", apiData);

  const [initial, setinitial] = useState({
    api_id: "",
    apiurl: "",
    apitoken_enable: "",
    apitoken: "",
    api_req_payload: "",
    api_header_payload: "",
    notify_url: "",
    campid: "",
    entityid: "",
    api_variables: "",
    remarks: "",
    status: "",
    userid: userid,
    action_name: "INSERT",
  });

  const JsonFields = {
    data: [
      {
        multiple: false,
        name: "campid",
        placeholder: "Select campaign",
        type: "multiSelect",
        options: componentOptions,
        validation: Yup.object().required("Campaign is required"),
      },
      {
        name: "api_id",
        placeholder: "API ID",
        validation: Yup.string().required("API ID is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "apiurl",
        placeholder: "API URL",
        validation: Yup.string().required("API URL is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "apitoken",
        placeholder: "API Token",
        validation: Yup.string().required("API Token is required"),
        type: "text",
        fullWidth: false,
      },
      {
        fullWidth: true,
        name: "api_req_payload",
        placeholder: "API Request Payload",
        validation: Yup.string().required("API Request Payload is required"),
        type: "textarea",
      },
      {
        name: "api_header_payload",
        placeholder: "API Header Payload",
        validation: Yup.string().required("API Header Payload is required"),
        type: "textarea",
        fullWidth: false,
      },
      {
        name: "notify_url",
        placeholder: "Notify URL",
        validation: Yup.string().required("Notify URL is required"),
        type: "text",
        fullWidth: false,
      },

      {
        name: "api_variables",
        placeholder: "API Variables",
        validation: Yup.string().required("API Variables is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "remarks",
        placeholder: "Remarks",
        // validation: Yup.string().required("Remarks is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "status",
        placeholder: "Status",
        label: "Status",
        type: "switch",
      },
      {
        name: "apitoken_enable",
        placeholder: "API Token Enable",
        label: "API Token Enable",
        type: "switch"
      },
    ],
    buttons: {
      className: "space-around",
      submitButton: {
        style: {},
        label: "Save API",
      },
      resetButton: {
        style: {},
        label: "Clear",
      },
    },
  };


  const getPidData = async () => {
    try {
      const componentOptionsResponse = await DynamicApiCall("multimedia/getcamplist", "get", token);
      let componentdata = componentOptionsResponse.data.map((option) => ({
        value: option.camp_id.toString(),
        name: option.camp_name,
        peid: option.peid
      }))
      setComponentOptions(componentdata);
    } catch (error) {
      console.error("Error fetching component options:", error.message);
    }
  };

  async function formsubmit(values) {
    const apiUrl = "sms/managecomponentapi";
    const method = "post";
    try {
      console.log("Values sms/managecomponentapi:  ", values)
      const modifiedValues = {
        ...values,
        api_req_payload: JSON.stringify(values.api_req_payload),
        api_header_payload: JSON.stringify(values.api_header_payload),
        campid: values.campid.value,
        status: values.status !== true ? "N" : "Y",
        apitoken_enable: values.apitoken_enable !== true ? "N" : "Y"
      }
      const apiResponse = await DynamicApiCall(apiUrl, method, token, modifiedValues);
      console.log("API Response:", apiResponse);
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPidData();
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

  }, [])

  return (
    <>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <h6>{apiData ? apiData.action_name : initial.action_name} Component API</h6>
      </SoftBox>
      <DynamicForm
        submitfunction={formsubmit}
        initialValues={apiData ? apiData : initial}
        fields={JsonFields}
      />
    </>
  );
}
