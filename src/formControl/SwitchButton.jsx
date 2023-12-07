import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
}));

const switchlabel = { inputProps: { 'aria-label': 'Color switch demo' } };

export function ColorSwitch({ label, ...props }) {
    console.log("ColorSwitch:: ", props)
    return (
        <div style={{margin: "10px" }}>
            <PinkSwitch {...switchlabel} {...props} />
            {label && <span style={{margin: '5px', fontSize: "15px"}}>{label}</span>}
        </div>
    );
}

ColorSwitch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};
