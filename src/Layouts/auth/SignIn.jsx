import * as React from "react";
import { useState } from "react";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import Switch from "@mui/material/Switch";
import CoverLayout from "../../components/LayoutContainers/CoverLayout";
import SoftButton from "../../components/SoftButton";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ValidatedTextField from "../../formControl/ValidatedTextField";
import DynamicApiCall from "../../utils/function";
import { login } from "../../redux/User";

function SignInSide() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    userid: Yup.string().required("user Id is required"),
    password: Yup.string().required("password is required"), // Fix the typo in the field name
  });


  const formik = useFormik({
    initialValues: { userid: "", password: "" }, // Fix the typo in the "password" field
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Values:", values);
      const apiUrl = "user/login";
      const method = "post";
      try {
        console.log("VALUEEE:: ", values)
        const apiResponse = await DynamicApiCall(apiUrl, method, '', values).then(
          (data) => {
            console.log("datadata", data)
            if (data.status === true) {
              const uData = {
                isLoggedIn: true,
                userInfo: data.data,
              };
              // localStorage.setItem("support_user", JSON.stringify(uData));
              dispatch(login({ isLoggedIn: true, userInfo: data.data }));
              navigate("/managesender", {
                replace: true,
              });
              console.log("API Response:", data);
            }
          }
        );
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  });


  return (
    <CoverLayout
      title="Welcome back to PAYZORROMM"
      description="Enter your userid and password"
      image=""
    >
      <SoftBox>
        <form onSubmit={formik.handleSubmit} style={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} spacing={2}>
              <ValidatedTextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="User id"
                name="userid"
                value={formik.values["userid"]}
                onBlur={() => formik.setFieldTouched("userid", true)}
                error={
                  formik.touched["userid"] && !!formik.errors["userid"]
                }
                helperText={
                  formik.touched["userid"] && formik.errors["userid"]
                }
                onChange={(value) =>
                  formik.setFieldValue("userid", value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <ValidatedTextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Password"
                name="password"
                type="password"
                value={formik.values["password"]}
                onBlur={() => formik.setFieldTouched("password", true)}
                error={
                  formik.touched["password"] &&
                  !!formik.errors["password"]
                }
                helperText={
                  formik.touched["password"] &&
                  formik.errors["password"]
                }
                onChange={(value) =>
                  formik.setFieldValue("password", value)
                }
              />
            </Grid>
            <Grid item xs={12}>

              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info" fullWidth>
                  Sign In
                </SoftButton>
              </SoftBox>

            </Grid>
          </Grid>
        </form>


        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignInSide;
