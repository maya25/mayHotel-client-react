import React from "react";
import {DeleteForever} from '@material-ui/icons'
import "./CancelButton.scss";

export default (props) => (
        <DeleteForever style={{ fontSize: 30 }} type="button" {...props}/>
)