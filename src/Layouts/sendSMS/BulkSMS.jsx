import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SoftBox from "../../components/SoftBox";
import { Box, Grid, TextField, TextareaAutosize } from "@mui/material";
import MultiSelect from "../../formControl/MultiSelect";
import ValidatedTextField from "../../formControl/ValidatedTextField";
import SoftButton from "../../components/SoftButton";
import DaynmicApicall from "../../utils/function";
import * as XLSX from "xlsx";
import SoftTypography from "../../components/SoftTypography";
import toast from "react-hot-toast";

export default function BulkSMS() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [getoptions, setOptions] = useState([]);
  const [gettemp, settemp] = useState("");
  const [visible, setvisible] = useState(false);
  const [file, setFile] = useState(null);

  const getmastertemp = async () => {
    try {
      const Info = await DaynmicApicall(
        `sms/getmastertemp/${userid}`,
        "get",
        token
      );
      if (Info?.data.length > 0) {
        const arr = Info?.data.map((item) => {
          return {
            value: item.peid,
            label: item.templatename,
            ...item,
          };
        });
        setOptions(arr);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    try {
      getmastertemp();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  const getexceinfo = async () => {
    if (!gettemp) {
      console.error("No template selected");
      return;
    }

    const selectedOption = getoptions.find(
      (option) => option.value === gettemp?.value
    );

    const headers = selectedOption.tempvariables
      .split("|")
      .map((header) => header.replace(/#/g, ""));

    headers.unshift("phonenumber");

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet([headers]);

    XLSX.utils.book_append_sheet(wb, ws, selectedOption.templatename);

    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const url = window.URL.createObjectURL(new Blob([wbout]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedOption.templatename}.xlsx`);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async (event) => {
    const selectedOption = getoptions.find(
      (option) => option.value === gettemp?.value
    );

    const expectedHeaders = selectedOption?.tempvariables
      .split("|")
      .map((header) => header.replace(/#/g, ""));
    expectedHeaders?.unshift("phonenumber");

    if (!file) {
      toast.error("No file selected", { autoClose: 2000 });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const headerRow = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];

      const uploadedHeaders = Object.values(headerRow);

      const headersMatch = expectedHeaders.every((header) =>
        uploadedHeaders.includes(header)
      );

      if (!headersMatch) {
        toast.error("Headers do not match", { autoClose: 2000 });
        return;
      }
      const formData = new FormData();
      formData.append("template", JSON.stringify(gettemp));
      formData.append("file", file);
      console.log("formData", formData);

      try {
        const response = await DaynmicApicall(
          "sms/sendbulksms",
          "post",
          token,
          formData,
          { "Content-Type": "multipart/form-data" }
        );
        console.log("API Response:", response);
      } catch (error) {
        console.error("Error uploading file:", error.message);
        toast.error("Error uploading file", { autoClose: 2000 });
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <SoftTypography
        variant="button"
        fontWeight="bold"
        color="info"
        textGradient
        my={1}
        mx={2}
      >
        Upload CSV/Excel File :
      </SoftTypography>
      <SoftBox display="flex" flexDirection="row" justifyContent="flex-start">
        <form style={{ width: "100%" }}>
          <SoftBox
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            py={1}
            px={1}
          >
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid item xs={12} md={3}>
                <MultiSelect
                  key="templist"
                  name="templist"
                  placeholder="Template Name"
                  multiple={false}
                  options={getoptions}
                  onChange={(event, value) => {
                    console.log("value", value);
                    settemp(value);
                    setvisible(true);
                  }}
                />
              </Grid>
              {visible && (
                <Grid item xs={12} md={2}>
                  <SoftButton
                    type="button"
                    style={{ border: "1px solid #D2D6DA" }}
                    onClick={getexceinfo}
                  >
                    Sample File
                  </SoftButton>
                </Grid>
              )}

              <Grid item xs={12} md={4}>
                <TextField
                  placeholder="Select a file"
                  type="file"
                  onChange={handleFileChange}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <SoftButton
                  type="button"
                  variant="gradient"
                  color="info"
                  onClick={() => handleFileUpload()}
                >
                  Upload
                </SoftButton>
              </Grid>
              {visible && (
                <Grid item xs={12} md={9}>
                  <Box pl={1}>
                    <TextareaAutosize
                      style={{
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: "400",
                        lineHeight: "1.5",
                        padding: "8px 12px",
                        borderRadius: "8px",
                      }}
                      aria-label="SMS Content"
                      minRows={4}
                      value={gettemp?.tempbody}
                      placeholder="SMS Content"
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </SoftBox>
        </form>
      </SoftBox>
    </div>
  );
}
