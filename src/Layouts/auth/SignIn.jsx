import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ValidatedTextField from "../../formControl/ValidatedTextField";
import theme from "../../assets/theme";
import DynamicApiCall from "../../utils/function";
import { login } from "../../redux/User";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        PAYZORROMM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
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
    <ThemeProvider theme={theme}>
      <Card>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "./auth.png",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
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
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </form>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  {/* <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid> */}
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
}
