import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "../../components/SoftBox";
import CustomTable from "../../formControl/Table";
import Tooltip from "@mui/material/Tooltip";
import { MutedCell } from "../../formControl/TableCellLayouts/tableCellLayouts";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SoftButton from "../../components/SoftButton";
import { useSelector } from "react-redux";
import DaynamicApicall from "../../utils/function";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import DynamicForm from "../../helpers/formikForm";
import MultiSelect from "../../formControl/MultiSelect";
import { Form, Formik } from "formik";
import DynamicApiCall from "../../utils/function";

export default function ManageMenumap() {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [getrows, setrows] = useState([]);
  const [arr, setarr] = useState([]);
  const [campData, setCampData] = useState([]);
  const [menuMapped, setMenuMapped] = useState([]);
  const [pageData, setPageData] = useState("");

  const validate = Yup.object({
    camp_id: Yup.object().required("Campaign Id is required"),
    user_group: Yup.object().required("User Group is required"),
    menu_id: Yup.array()
      .required("Menu Name is required")
      .min(1, "At least one menu must be selected"),
  });

  let columns = [
    {
      field: "map_id",
      headerName: "S.No.",
      width: 70,
      renderCell: (params) =>
        params.value && (
          <Tooltip
            title={<MutedCell title={params.value} />}
            color="inherit"
            placement="bottom-start"
          >
            <span>
              <MutedCell title={params.value} />
            </span>
          </Tooltip>
        ),
    },
    {
      field: "camp_id",
      headerName: "Campaign Id",
      width: 150,
      renderCell: (params) =>
        params.value && (
          <Tooltip
            title={<MutedCell title={params.value} />}
            color="inherit"
            placement="bottom-start"
          >
            <span>
              <MutedCell title={params.value} />
            </span>
          </Tooltip>
        ),
    },
    {
      field: "user_group",
      headerName: "User Group",
      width: 200,
      renderCell: (params) =>
        params.value && (
          <Tooltip
            title={<MutedCell title={params.value} />}
            color="inherit"
            placement="bottom-start"
          >
            <span>
              <MutedCell title={params.value} />
            </span>
          </Tooltip>
        ),
    },
    {
      field: "menu_id",
      headerName: "Menu Id",
      width: 300,
      renderCell: (params) =>
        params.value && (
          <Tooltip
            title={<MutedCell title={params.value} />}
            color="inherit"
            placement="bottom-start"
          >
            <span>
              <MutedCell title={params.value} />
            </span>
          </Tooltip>
        ),
    },
    {
      field: "menu_display_name",
      headerName: "Menu Display Name",
      width: 250,
      renderCell: (params) =>
        params.value && (
          <Tooltip
            title={<MutedCell title={params.value} />}
            color="inherit"
            placement="bottom-start"
          >
            <span>
              <MutedCell title={params.value} />
            </span>
          </Tooltip>
        ),
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 90,
      renderCell: (params) =>
        params.value && <MutedCell title={params.value} org="Organization" />,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   type: "actions",
    //   width: 110,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       label="Active"
    //       onClick={() => {
    //         params.row.action_name = "UPDATE";
    //       }}
    //       showInMenu
    //     />,

    //     <GridActionsCellItem
    //       label="In Active"
    //       onClick={(e) => {}}
    //       showInMenu
    //     />,
    //   ],
    // },
  ];

  async function formsubmit(values) {
    try {
      console.log("Values /multimedia/managecomponentjson:  ", values);
      const menuValues =
        values.menu_id.length > 0
          ? values.menu_id.map((menu) => menu.value)
          : [];
      const menuID = { string_array: menuValues };
      const payload = {
        mapid: "NEW",
        campid: values?.camp_id?.value,
        campname: values?.camp_id?.name,
        usergroup: values?.user_group?.value,
        menuid: values.menu_id.length > 0 ? values?.menu_id[0].value : "",
        templatedata: menuID,
        is_active: "Y",
        createdby: userid,
        action_name: "INSERT",
      };
      const apiUrl = "multimedia/managemenumapped";
      const method = "post";
      const apiResponse = await DynamicApiCall(apiUrl, method, token, payload);
      console.log("apiResponse", apiResponse);
      if (apiResponse?.message === "SUCCESS") {
        getallmenumapped(values?.user_group?.value, values?.camp_id?.value);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  const getcomponentJson = async () => {
    try {
      const Info = await DaynamicApicall(
        "multimedia/getcomponentjson/1",
        "get",
        token
      );
      console.log("Info", Info);
      Info.data && Info.data.length > 0
        ? setPageData(Info.data[0].comp_json)
        : setPageData("");
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getallmenumapped = async (usergroup, campid) => {
    try {
      const Info = await DaynamicApicall(
        `multimedia/getmenumapped/${usergroup}/${campid}`,
        "get",
        token
      );
      setrows(Info.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getMenuMaster = async () => {
    try {
      const Info = await DaynamicApicall(
        "multimedia/getallmenumaster",
        "get",
        token
      );
      const arrData =
        Info.data.length > 0
          ? Info.data.map((option) => ({
              name: option.menu_name,
              value: option.menu_id,
            }))
          : [];
      console.log("arrData", arrData);
      console.log("pageApi", pageData);
      // await pageData?.data[2]?.options?.push(arrData);
      // setarr(arrData);
      if (pageData && pageData.data && pageData.data.length > 2) {
        pageData.data[2].options = arrData;
      }

      setarr(arrData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getCampList = async () => {
    try {
      const clientOptionsResponse = await DaynamicApicall(
        "multimedia/getcamplist",
        "get",
        token
      );
      let clientdata = clientOptionsResponse.data.map((option) => ({
        value: option.camp_id.toString(),
        name: option.camp_name,
      }));
      setCampData(clientdata);
    } catch (error) {
      console.error("Error fetching client options:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getcomponentJson();
        await getCampList();
        await getMenuMaster();
        await getallmenumapped("ALL", "ALL");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const getmenumap = async (campid, usergroup, setFieldValue) => {
    try {
      const menus = await DaynamicApicall(
        `multimedia/getmenumap/${campid}/${usergroup}`,
        "get",
        token
      );
      let data = [];
      let a = menus.data.map((d1) => {
        data.push(d1.menu_id);
      });
      Promise.all(a).then((values) => {
        setMenuMapped(data);
        setFieldValue(
          "menu_id",
          arr?.filter((v) => data.includes(v.value))
        );
      });
    } catch (error) {
      console.error("Error fetching client options:", error.message);
    }
  };

  let initial = {
    camp_id: { value: "", name: "" },
    user_group: { value: "", name: "" },
    menu_id: arr?.filter((v) => menuMapped.includes(v.value)),
    userid: userid,
    action_name: "INSERT",
  };

  return (
    <>
      {/* {Object.keys(pageData).length > 0 ? ( */}
      {arr.length > 0 && Object.keys(pageData).length > 0 ? (
        <div>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <SoftBox mt={1}>
                <SoftBox mb={3}>
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      "& .table-header": {
                        fontWeight: "bold !important",
                        color: "#6c757d",
                      },
                    }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      px={2}
                      py={1}
                    >
                      <Grid item>Manage Menu Mapping</Grid>
                    </Grid>
                    <Grid container my={2}>
                      <Grid item>
                        <Formik
                          initialValues={initial}
                          validationSchema={validate}
                          onSubmit={formsubmit}
                        >
                          {(formik) => (
                            <Form
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <MultiSelect
                                key={pageData?.data[0]?.name}
                                multiple={pageData?.data[0]?.multiple}
                                options={campData}
                                getOptionLabel={(option) => option.name}
                                placeholder={pageData?.data[0]?.placeholder}
                                value={formik.values.camp_id}
                                onChange={(event, value) =>
                                  formik.setFieldValue(
                                    pageData?.data[0]?.name,
                                    value
                                  )
                                }
                              />
                              {formik.touched[pageData?.data[0]?.name] &&
                                formik.errors[pageData?.data[0]?.name] && (
                                  <div
                                    style={{
                                      color: "red",
                                      fontFamily:
                                        "Roboto,Helvetica,Arial,sans-serif",
                                      fontSize: "0.75rem",
                                      fontWeight: "400",
                                      lineHeight: "1.25",
                                      letterSpacing: "0.03333em",
                                      textAlign: "left",
                                      marginRight: "14px",
                                      marginBottom: "0",
                                      marginLeft: "22px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {formik.errors[pageData?.data[0]?.name]}
                                  </div>
                                )}
                              <MultiSelect
                                key={pageData?.data[1]?.name}
                                multiple={pageData?.data[1]?.multiple}
                                options={pageData?.data[1]?.options}
                                getOptionLabel={(option) => option.name}
                                placeholder={pageData?.data[1]?.placeholder}
                                value={formik.values.user_group}
                                onChange={async (event, value) => {
                                  formik.setFieldValue(
                                    pageData?.data[1]?.name,
                                    value
                                  );
                                  await getmenumap(
                                    formik.values[pageData?.data[0]?.name].value
                                      ? formik.values[pageData?.data[0]?.name]
                                          .value
                                      : "",
                                    value.value,
                                    formik.setFieldValue
                                  );
                                  await getallmenumapped(
                                    value.value,
                                    formik.values[pageData?.data[0]?.name].value
                                  );
                                }}
                              />
                              {formik.touched[pageData?.data[1]?.name] &&
                                formik.errors[pageData?.data[1]?.name] && (
                                  <div
                                    style={{
                                      color: "red",
                                      fontFamily:
                                        "Roboto,Helvetica,Arial,sans-serif",
                                      fontSize: "0.75rem",
                                      fontWeight: "400",
                                      lineHeight: "1.25",
                                      letterSpacing: "0.03333em",
                                      textAlign: "left",
                                      marginRight: "14px",
                                      marginBottom: "0",
                                      marginLeft: "22px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {formik.errors[pageData?.data[1]?.name]}
                                  </div>
                                )}
                              <MultiSelect
                                key={pageData?.data[2]?.name}
                                multiple={pageData?.data[2]?.multiple}
                                // options={pageData?.data[2]?.menuid.options}
                                options={arr}
                                getOptionLabel={(option) => option.name}
                                placeholder={pageData?.data[2]?.placeholder}
                                value={formik.values.menu_id}
                                onChange={(event, value) =>
                                  formik.setFieldValue(
                                    pageData?.data[2]?.name,
                                    value
                                  )
                                }
                              />
                              {formik.touched[pageData?.data[2]?.name] &&
                                formik.errors[pageData?.data[2]?.name] && (
                                  <div
                                    style={{
                                      color: "red",
                                      fontFamily:
                                        "Roboto,Helvetica,Arial,sans-serif",
                                      fontSize: "0.75rem",
                                      fontWeight: "400",
                                      lineHeight: "1.25",
                                      letterSpacing: "0.03333em",
                                      textAlign: "left",
                                      marginRight: "14px",
                                      marginBottom: "0",
                                      marginLeft: "22px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {formik.errors[pageData?.data[2]?.name]}
                                  </div>
                                )}

                              <Grid item ml={3} mr={2} mt={2}>
                                <SoftButton
                                  size="small"
                                  type="reset"
                                  variant="gradient"
                                  color="info"
                                  onClick={formik.resetForm}
                                >
                                  {pageData.buttons.resetButton.label}
                                </SoftButton>
                              </Grid>
                              <Grid item mr={1} mt={2}>
                                <SoftButton
                                  variant="contained"
                                  size="small"
                                  color="success"
                                  type="submit"
                                >
                                  {pageData.buttons.submitButton.label}
                                </SoftButton>
                              </Grid>
                            </Form>
                          )}
                        </Formik>
                      </Grid>
                    </Grid>
                    <CustomTable
                      rows={getrows}
                      columns={columns}
                      uniquekey="map_id"
                    />
                  </Card>
                </SoftBox>
              </SoftBox>
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
