import React from 'react'
import './Loader.css'
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader() {
    return (
        <div className="center">
            <CircularProgress />
        </div>
    )
}