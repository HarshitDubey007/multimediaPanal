import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "../../components/SoftBox";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";
import SoftButton from "../../components/SoftButton";
import DynamicApiCall from "../../utils/function";
import { useSelector } from "react-redux";

export default function SendSms({ tempData }) {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [formValue, setFromValue] = useState({});
  const [finalApiBody, setFinalApiBody] = useState({});

  const JsonFields = {
    initialValues: { phone: "" },
    data: [
      {
        name: "phone",
        placeholder: "Enter Phone number",
        validation: Yup.string()
          .required("Phone number required")
          .matches(/^[0-9]{10}$/, "Invalid mobile number"),
        type: "text",
        fullWidth: true,
      },
    ],
    buttons: {
      className: "space-around",
      submitButton: {
        style: {},
        label: "send sms",
      },
      resetButton: {
        style: {},
        label: "Clear",
      },
    },
  };

  useEffect(() => {
    if (tempData) {
      let variables = tempData?.tempvariables?.split("|");
      let dynamicFields = variables.map((variable) => ({
        name: variable,
        placeholder: `Enter ${variable}`,
        validation: Yup.string().required(`${variable} required`),
        type: "text",
        fullWidth: true,
      }));

      setFromValue((prevValue) => ({
        ...JsonFields,
        data: [...JsonFields.data, ...dynamicFields],
      }));
    }
  }, [tempData]);

  async function formsubmit(values) {
    const apiUrl = "sms/manageentity";
    const method = "post";
    try {
      let regx = new RegExp(tempData.tempvariables, "gi");
      let content = tempData.tempbody.replace(regx, function (match) {
        return values[match];
      });
      let templete = {
        ...values,
        apiid: 2, //Need to remove
        textContent: content,
      };

      setFinalApiBody(templete);
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  async function sendSms() {
    try {
      const apiUrl = "sms/send-sms";
      const method = "post";

      const apiResponse = await DynamicApiCall(apiUrl, method, token, {
        ...finalApiBody,
        ...tempData,
      });
    } catch (error) {}
  }
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={12} lg={6}>
          <SoftBox mt={1}>
            <SoftBox mb={3}>
              <Card style={{ padding: "10px" }}>
                <Grid container justifyContent="space-between" px={2} pt={1}>
                  <Grid item>Send SMS</Grid>
                </Grid>
                <hr
                  style={{
                    backgroundColor: "#e8e5e5",
                    margin: "0 auto",
                    width: "100%",
                  }}
                />
                {Object.keys(formValue).length > 0 && (
                  <DynamicForm
                    submitfunction={formsubmit}
                    initialValues={JsonFields.initialValues}
                    fields={formValue}
                  />
                )}
              </Card>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <SoftBox mt={1}>
            <SoftBox mb={3}>
              <Card style={{ padding: "10px" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                  pt={1}
                >
                  <Grid item>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>Final Body</div>
                      {/* Add any additional content for the "Final API Body" title */}
                    </div>
                  </Grid>
                  <Grid item mb={2}>
                    <SoftButton
                      variant="contained"
                      size="small"
                      color="success"
                      type="submit"
                      onClick={sendSms}
                    >
                      Final Send SMS
                    </SoftButton>
                  </Grid>
                </Grid>
                <hr
                  style={{
                    backgroundColor: "#e8e5e5",
                    margin: "0 auto",
                    width: "100%",
                  }}
                />
                <pre
                  style={{
                    overflowX: "auto",
                    maxHeight: "300px", // Set a max height to make the scrollbar appear
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ccc #f0f0f0", // Customize scrollbar colors
                  }}
                >
                  {JSON.stringify(finalApiBody, null, 2)}
                </pre>
              </Card>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </>
  );
}
