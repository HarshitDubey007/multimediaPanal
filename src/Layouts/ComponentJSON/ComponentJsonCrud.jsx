import React, { useEffect, useState } from "react";
import DynamicForm from "../../helpers/formikForm";
import * as Yup from "yup";
import SoftBox from "../../components/SoftBox";
import DynamicApiCall from "../../utils/function";
import { useSelector } from "react-redux";

export default function ComponentJsonCrud({
  compData,
  setModalOpen,
  menuParent,
}) {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { userid, token } = userInfo;
  const [componentOptions, setComponentOptions] = useState([]);
  console.log("compData", compData);

  const [initial, setinitial] = useState({
    menu_id: "",
    menu_name: "",
    menu_display_name: "",
    parent_id: { value: "", name: "" },
    menu_type: { value: "", name: "" },
    display_menu_order: "",
    url: "",
    comp_json: "",
    is_active: "",
    remarks: "",
    userid: userid,
    action_name: "INSERT",
  });

  useEffect(() => {
    let menudata =
      menuParent.length > 0
        ? menuParent.map((option) => ({
            value: option.menu_id,
            name: option.menu_name,
          }))
        : [];
    menudata.push({ value: "NA", name: "NA" });
    setComponentOptions(menudata);
  }, []);

  const JsonFields = {
    data: [
      {
        name: "menu_id",
        placeholder: "Menu Id",
        validation: Yup.string().required("Menu Id Name is required"),
        type: "text",
        fullWidth: false,
        disabled: compData?.action_name === "UPDATE" ? true : false,
      },
      {
        name: "menu_name",
        placeholder: "Menu Name",
        validation: Yup.string().required("Menu Name is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "menu_display_name",
        placeholder: "Menu Display Name",
        validation: Yup.string().required("Menu Display Name is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "display_menu_order",
        placeholder: "Menu Display Order",
        validation: Yup.string().required("Menu Display Order is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "url",
        placeholder: "Menu Image",
        validation: Yup.string().required("Menu Image is required"),
        type: "text",
        fullWidth: false,
      },
      {
        name: "parent_id",
        placeholder: "Menu Parent",
        validation: Yup.object().required("Menu Parent is required"),
        type: "multiSelect",
        multiple: false,
        options: componentOptions,
      },
      {
        name: "menu_type",
        placeholder: "Menu Type",
        validation: Yup.object().required("Component Name is required"),
        type: "multiSelect",
        multiple: false,
        options: [
          { value: "MENU", name: "MENU" },
          { value: "NA", name: "NA" },
        ],
      },
      {
        name: "remarks",
        placeholder: "Remarks",
        type: "text",
        fullWidth: false,
      },
      {
        name: "comp_json",
        placeholder: "Component Json",
        validation: Yup.string().required("Component Json is required"),
        type: "textarea",
        fullWidth: false,
      },
      {
        name: "is_active",
        placeholder: "Status",
        label: "Status",
        type: "switch",
      },
    ],
    buttons: {
      className: "space-around",
      submitButton: {
        style: {},
        label: "Save JSON",
      },
      resetButton: {
        style: {},
        label: "Clear",
      },
    },
  };

  async function formsubmit(values) {
    const apiUrl = "/multimedia/managemenus";
    const method = "post";
    try {
      console.log("Values /multimedia/managecomponentjson:  ", values);
      const modifiedValues = {
        menuid: values.menu_id,
        menuname: values.menu_name,
        menulable: values.menu_display_name,
        menutype: values.menu_type.value,
        imgurl: values.url,
        parentmenuid: values.parent_id.value,
        comp_id: compData.object_name ? compData.object_name : 0,
        menusno: values.display_menu_order ? values.display_menu_order : 0,
        comp_json: JSON.parse(values.comp_json),
        remarks: values.remarks,
        createdby: userid,
        is_active: values.is_active !== true ? "N" : "Y",
        action_name: compData ? compData.action_name : initial.action_name,
      };
      console.log("modifiedValues:  ", modifiedValues);

      const apiResponse = await DynamicApiCall(
        apiUrl,
        method,
        token,
        modifiedValues
      );
      console.log("API Response:", apiResponse);
      if (apiResponse?.message === "SUCCESS") {
        setModalOpen(false);
      }
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
          {compData ? compData.action_name : initial.action_name} Component JSON
        </h6>
      </SoftBox>
      <DynamicForm
        submitfunction={formsubmit}
        initialValues={compData ? compData : initial}
        fields={JsonFields}
      />
    </>
  );
}
