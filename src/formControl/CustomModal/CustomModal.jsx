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

export default function CustomModal({ component }) {
    const [open, setOpen] = React.useState(false);
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
    };

    const handleFormSubmit = () => {
        // Add your form submission logic here
        console.log('Form submitted!');
        handleClose();
    };

    return (
        <React.Fragment>
            {/* <SoftBadge variant="gradient" badgeContent="Initiate sms" onClick={handleClickOpen} color="info" size="xs" /> */}

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                {/* <DialogContent> */}
                    <Card>
                        {component}
                    </Card>
                {/* </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleFormSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
