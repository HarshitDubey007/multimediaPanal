import React, { useEffect } from 'react';
import DynamicForm from '../../helpers/formikForm';
import * as Yup from 'yup';
import SoftBox from '../../components/SoftBox';
import DynamicApiCall from '../../utils/function';

export default function UserCrud({ userData }) {
    console.log("userData", userData)

    const [initial, setinitial] = React.useState({
        userid: "",
        username: "",
        usergroup: "",
        userright: "",
        campaignids: "",
        userrole: "",
        verifier: "",
        lockstatus: true,
        keypointer: "",
        loginstatus: true,
        active: "Y",
        remarks: "",
        createdby: "ADMIN",
        languagename: "ENGLISH",
        action_name: "INSERT"
    });



    async function formsubmit(value) {
        // const Info = await DynamicApiCall('user/manageuser', 'post');
        console.log("value:: ", value)
        // setrows(Info.data)


    }
    return (
        <>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <h6>{userData ? userData.action_name : initial.action_name} USER</h6>
            </SoftBox>
            <DynamicForm
                submitfunction={formsubmit}
                initialValues={userData ? userData : initial}
                fields={[
                    {
                        name: 'userid',
                        placeholder: 'User Id',
                        validation: Yup.string().required('user_id is required'),
                        type: 'text',
                    },
                    {
                        name: 'username',
                        placeholder: 'User Name',
                        validation: Yup.string().required('user_name is required'),
                        type: 'text',
                    },
                    {
                        multiple: false,
                        name: 'usergroup',
                        placeholder: 'Select User Group',
                        type: 'multiSelect',
                        options: [
                            { value: 'ADMIN', name: 'ADMIN' },
                            { value: 'SUPER-ADMIN', name: 'SUPER-ADMIN' },
                            { value: 'AGENT', name: 'AGENT' },
                            { value: 'TEM-LEAD', name: 'TEM-LEAD' },
                        ],
                        validation: Yup.object().required('User Group is required'),
                    },
                    {
                        multiple: true,
                        name: 'userright',
                        placeholder: 'Select User Rights',
                        type: 'multiSelect',
                        options: [
                            { value: '1', name: 'READ' },
                            { value: '2', name: 'WRITE' },
                            { value: '3', name: 'DELETE' },
                        ],
                        validation: Yup.object().required('User Group is required'),
                    },
                    {
                        multiple: false,
                        name: 'campaignids',
                        placeholder: 'Select campaign',
                        type: 'multiSelect',
                        options: [
                            { value: '110', name: 'Kotak' },
                            { value: '101', name: 'HDFC' },
                            { value: '102', name: 'BIRLA' },
                        ],
                        validation: Yup.object().required('Campaign is required'),
                    },
                    {
                        name: 'verifier',
                        placeholder: 'verifier',
                        validation: Yup.string().required('verifier is required'),
                        type: 'text',
                    },
                    {
                        name: 'lockstatus',
                        label: 'lockstatus',
                        placeholder: 'lockstatus',
                        type: 'switch',
                    },
                    {
                        name: 'loginstatus',
                        label: 'loginstatus',
                        placeholder: 'loginstatus',
                        type: 'switch',
                    },
                    {
                        name: 'active',
                        label: 'active',
                        placeholder: 'active',
                        type: 'switch',
                    },
                ]}
            />
        </>
    );
}
