import React from "react";
import './DownloadEntry.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePdf, faFileCsv, faFile, faFileExcel, faDownload} from "@fortawesome/free-solid-svg-icons";

export default function DownloadEntry(props) {
    let format;
    switch (props.file) {
        case "pdf":
            format = <FontAwesomeIcon icon={faFilePdf} size={'2x'} color='red'/>;
            break;
        case "csv":
            format = <FontAwesomeIcon icon={faFileCsv} size={'2x'} color={'green'}/>;
            break;
        case "xlsx":
            format = <FontAwesomeIcon icon={faFileExcel} size={'2x'} color={'blue'}/>;
            break;
        default:
            format = <FontAwesomeIcon icon={faFile} size={'2x'} color='#aa65f0'/>;
            break;
    }
    return (
        <div className='download-entry'>
            <div className='download-content-wrapper'>
                {format}
                <div>
                    <div>{props.title}</div>
                    <div>{props.description}</div>
                </div>
            </div>
            <FontAwesomeIcon icon={faDownload} size={'2x'} color='#2a5885' style={{marginRight: "50px", cursor: "pointer"}}/>
        </div>
    )
}