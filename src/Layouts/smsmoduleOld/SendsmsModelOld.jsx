import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import SoftBadge from '../../components/SoftBadge';
import Card from '@mui/material/Card';
import MultiSelect from '../../formControl/MultiSelect';
import SoftBox from '../../components/SoftBox';
import Grid from '@mui/material/Grid';
import { getFormData } from '../../helpers/helpers';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from 'react';
import ValidatedTextField from '../../formControl/ValidatedTextField';
import ValidatedTextArea from '../../formControl/ValidatedTextArea';


const top100Films = [
    { title: 'AIRTEL', year: 1994 },
    { title: 'TATA', year: 1972 }
];

const Entites = [
    { label: "112************3456", value: "112************3456" },
    { label: "112************3454", value: "112************3454" },
    { label: "112************3453", value: "112************3453" },
    { label: "112************3452", value: "112************3452" },
];

export default function SendsmsModel(props) {
    console.log("props::: ", props)
    const [open, setOpen] = React.useState(false);
    const [addTemplete, setAddTemplete] = useState({
        sendername: '',
        PEID: '',
        category: '',
        tid: '',
        ttype: '',
    });

    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleSendsmsModelOpen = (row) => {
      setSelectedRow(row);
    };
  
    const handleSendsmsModelClose = () => {
      setSelectedRow(null);
    };
  

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const handleManageTemplete = (event) => {
        event.preventDefault();
        const formData = getFormData(event.target);
        console.log("Uploaded File:", formData, addTemplete);
    };

    const handleAddTemplete = (name, value) => {
        setAddTemplete((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

useEffect(() => {
//   return () => {
    console.log("open::: ", open)
    handleClickOpen()
//   };
}, [])


    return (
        <React.Fragment>
            <SoftBadge variant="gradient" id={props.sr} badgeContent="Initiate sms" onClick={handleClickOpen} color="info" size="xs" />

            {/* <Dialog fullWidth={true} maxWidth="md"  open={open} onClose={handleClose}> */}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Grid item xs={12} md={12} >
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                            <h6>Add Template</h6>
                        </SoftBox>
                        <Grid spacing={2} mt={2}>
                            <form onSubmit={handleManageTemplete}>

                                <MultiSelect
                                    size="small"
                                    name="sendername"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    placeholder="Sender Name"
                                    onChange={(event, newValue) => handleAddTemplete('sendername', newValue)}
                                />
                                <MultiSelect
                                    size="small"
                                    name="PEID"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    placeholder="PEID (Principal Entity Identifier)"
                                    onChange={(event, newValue) => handleAddTemplete('PEID', newValue)}
                                />
                                <MultiSelect
                                    size="small"
                                    name="category"
                                    options={Entites}
                                    getOptionLabel={(option) => option.label}
                                    placeholder="Category"
                                    onChange={(event, newValue) => handleAddTemplete('category', newValue)}
                                />
                                <ValidatedTextField
                                    name="phone"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Phone No"
                                    // value={formData.tid}
                                    onChange={(value) => handleAddTemplete('tid', value)}
                                />
                                <ValidatedTextField
                                    name="tid"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Template Id"
                                    // value={formData.tid}
                                    onChange={(value) => handleAddTemplete('tid', value)}
                                />
                                <ValidatedTextField
                                    name="ttype"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Template Type"
                                    // value={formData.ttype}
                                    onChange={(value) => handleAddTemplete('ttype', value)}
                                />
                                <ValidatedTextArea
                                    label="Templete Body"
                                value={props.tamplate}
                                // onChange="{handleTextChange}"
                                // onBlur="{handleBlur}"
                                // error="{isError}"
                                // helperText="Must be at least 5 characters"
                                // validate={(value) => value.length >= 5}

                                />
                                <Grid item>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


// validityPeriod
// track
// type
// notifyUrl
// text(templete body)
// contentTemplateId
// principalEntityId
// to
// from
// actions