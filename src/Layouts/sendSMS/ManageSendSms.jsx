import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "../../components/SoftBox";
import { useSelector } from "react-redux";
import DaynmicApicall from "../../utils/function";
import SoftTypography from "../../components/SoftTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SingleSMS from "./SingleSMS";
import BulkSMS from "./BulkSMS";

export default function ManageSendSms() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [value, setValue] = useState("Single");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SoftBox mt={1}>
              <SoftBox
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                my={2}
              >
                <Card style={{ width: "100%", padding: "15px 20px" }}>
                  <SoftTypography
                    variant="h3"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Send SMS
                  </SoftTypography>
                  <SoftBox mt={2}>
                    <FormControl
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        style={{
                          color: "rgba(0, 0, 0, 0.6)",
                          fontSize: "smaller",
                        }}
                      >
                        Select SMS Type :
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        style={{ paddingLeft: "15px" }}
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="Single"
                          control={<Radio />}
                          label="Single SMS"
                          style={{ paddingLeft: "20px" }}
                        />
                        <FormControlLabel
                          value="Bulk"
                          control={<Radio />}
                          label="Bulk SMS"
                          style={{ paddingLeft: "20px" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </SoftBox>
                </Card>
              </SoftBox>
            </SoftBox>

            <SoftBox mb={3}>
              <Card style={{ width: "100%", padding: "10px" }}>
                {value === "Single" ? <SingleSMS /> : <BulkSMS />}
              </Card>
            </SoftBox>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
