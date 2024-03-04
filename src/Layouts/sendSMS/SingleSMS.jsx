import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SoftBox from "../../components/SoftBox";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MultiSelect from "../../formControl/MultiSelect";
import SoftButton from "../../components/SoftButton";
import DaynmicApicall from "../../utils/function";
import SoftTypography from "../../components/SoftTypography";
import SendSms from "../smsTemplete/SendSms";

export default function SingleSMS() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [getoptions, setOptions] = useState([]);
  const [gettemp, settemp] = useState("");
  const [visible, setvisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSendsmsModelOpen = (row) => {
    setModalOpen(true);
  };

  const handleSendsmsModelClose = () => {
    setModalOpen(false);
  };

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
        Select template and send SMS :
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
                    settemp(value);
                    setvisible(true);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <SoftButton
                  type="button"
                  variant="gradient"
                  color="info"
                  onClick={() => handleSendsmsModelOpen()}
                >
                  Send SMS
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
      {/* send live sms */}
      <Grid>
        <Dialog
          sx={{ mt: 2 }}
          open={isModalOpen}
          onClose={handleSendsmsModelClose}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <IconButton
              aria-label="close"
              onClick={handleSendsmsModelClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <h1>Send SMS</h1>
            <SendSms tempData={gettemp ? gettemp : ""} />
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
}
