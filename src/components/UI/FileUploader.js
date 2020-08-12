import React, {useState} from 'react'
import {Button} from "@material-ui/core";
import './FileUploader.scss'



export default function() {
    const [selectedFile, handleSelected] = useState(null);
    console.log(selectedFile)
    return (
        <div>
            <label className='file-input-label' htmlFor="file-input">Загрузить файл</label>
            <input id='file-input' className='file-input' type="file" onChange={e => handleSelected(e.target.files[0])}/>
            <Button onClick={() => console.log("Загружаем файл")}>Загрузи файлик пожалуйста</Button>
        </div>
    )
}