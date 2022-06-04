import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function saveConfigToScript (notification) {
    var saveMessage = new CustomEvent('saveConfig', {
        detail: {
            searchData: window.searchData, 
            notification: !!notification
        }
    });
    document.dispatchEvent(saveMessage);
}

const presetCssList = [
`     .search-jumper-searchBarCon {
         position: fixed;
         top: 0;
         left: 0;
         width: 100%;
         z-index: 2147483646;
         pointer-events: none;
         text-align: center;
         overflow: scroll;
         display: block;
         -ms-overflow-style: none;
         scrollbar-width: none;
     }
     .search-jumper-searchBar {
         overflow-wrap: break-word;
         background: #505050;
         border-radius: 20px!important;
         border: 1px solid #b3b3b3;
         display: inline-flex;
         pointer-events: all;
         margin-top: -25px;
         opacity: 0.3;
         vertical-align: top;
         user-select: none;
         box-sizing:content-box;
         text-align: center;
         position: relative;
     }
     .search-jumper-btn {
         position: relative;
         display: grid;
         padding: 1px;
         margin: 3px;
         cursor: pointer;
         width: 32px;
         height: 32px;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
         text-decoration:none;
         min-width: 32px;
         min-height: 32px;
     }
     .search-jumper-btn>i {
         line-height: 32px;
     }
     .search-jumper-logoBtnSvg {
         width: 32px;
         height: 32px;
         overflow: hidden;
         vertical-align: top;
         cursor: grab;
     }
     .search-jumper-type {
         display: inline-flex;
         background: #c5c5c5;
         border-radius: 20px!important;
         overflow: hidden;
     }
     .search-jumper-word {
         background: black;
         color: white!important;
     }
     .search-jumper-tips {
         pointer-events: none;
         position: fixed;
         font-size: xx-large;
         background: #f5f5f5e0;
         border-radius: 10px!important;
         padding: 5px;
         box-shadow: 0px 0px 10px 0px #000;
         font-weight: bold;
         transition: all 0.2s ease;
         color: black;
         white-space: nowrap;
     }
     .search-jumper-searchBar .search-jumper-btn:hover {
         color: white;
         text-decoration:none;
     }`,
`     .search-jumper-searchBarCon {
         position: fixed;
         top: 0;
         left: 0;
         width: 100%;
         z-index: 2147483646;
         pointer-events: none;
         text-align: center;
         overflow: scroll;
         display: block;
         -ms-overflow-style: none;
         scrollbar-width: none;
     }
     .search-jumper-searchBar {
         overflow-wrap: break-word;
         background: #AFAFAF;
         border-radius: 20px!important;
         border: 1px solid #c9c9c9;
         display: inline-flex;
         pointer-events: all;
         margin-top: -25px;
         opacity: 0.3;
         vertical-align: top;
         user-select: none;
         box-sizing:content-box;
         text-align: center;
         position: relative;
     }
     .search-jumper-btn {
         position: relative;
         display: grid;
         padding: 1px;
         margin: 3px;
         cursor: pointer;
         width: 32px;
         height: 32px;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
         text-decoration:none;
         min-width: 32px;
         min-height: 32px;
     }
     .search-jumper-type {
         display: inline-flex;
         background: #efefef;
         overflow: hidden;
     }
     .search-jumper-word {
         background: white;
         color: black!important;
     }
     .search-jumper-tips {
         pointer-events: none;
         position: fixed;
         font-size: xx-large;
         background: #0A0A0Ae0;
         border-radius: 10px!important;
         padding: 5px;
         box-shadow: 0px 0px 10px 0px #FFFFFF;
         font-weight: bold;
         transition: all 0.2s ease;
         color: white;
         white-space: nowrap;
     }
     .search-jumper-searchBar .search-jumper-btn:hover {
         -webkit-transform:scale(1.2);
         -moz-transform:scale(1.2);
         transform:scale(1.2);
         color: black;
         text-decoration:none;
     }`
];

function UploadSpeedDialAction(props) {
    return (
        <React.Fragment>
            <input
                accept=".txt, .json"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={props.onChange}
            />
            <label htmlFor="icon-button-file">
                <SpeedDialAction
                    component="span"
                    {...props}
                ></SpeedDialAction>
            </label>
        </React.Fragment>
    );
}

export default function Export() {
    const [presetCss, setPresetCss] = React.useState('');
    const [cssText, setCssText] = React.useState(window.searchData.prefConfig.cssText);
    const [fontAwesomeCss, setFontAwesomeCss] = React.useState(window.searchData.prefConfig.fontAwesomeCss);
    const sitesData = JSON.stringify(window.searchData.sitesConfig, null, 4);

    var sitesDataInput;
    var downloadEle = document.createElement('a');
    downloadEle.download = "searchJumper.json";
    downloadEle.target = "_blank";
    function saveConfig() {
        try {
            window.searchData.sitesConfig = JSON.parse(sitesDataInput.value);
            window.searchData.prefConfig.cssText = cssText;
            window.searchData.prefConfig.fontAwesomeCss = fontAwesomeCss;
            saveConfigToScript(true);
        } catch (e) {
            alert(e);
        }
    }

    function copyConfig() {
        var copyMessage = new Event('copyConfig');
        document.dispatchEvent(copyMessage);
    }

    function importConfig(event) {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = function() {
            sitesDataInput.value = this.result;
            saveConfig();
        };
    }

    function exportConfig() {
        let blobStr = [sitesDataInput.value];
        let myBlob = new Blob(blobStr, { type: "application/json" });
        downloadEle.href = window.URL.createObjectURL(myBlob);
        downloadEle.click();
    }

    const handleChange = (event: SelectChangeEvent) => {
        setPresetCss(event.target.value);
        if (event.target.value === '') return;
        if (!cssText || window.confirm(window.i18n('replaceCss'))) {
            setCssText(presetCssList[event.target.value]);
        }
    };
    return (
        <Box>
            <Paper elevation={5} sx={{textAlign:'center', borderRadius:'10px'}}>
                <h2 style={{padding:'5px'}}>{window.i18n('exportConfig')}</h2>
            </Paper>
            <TextField
                id="outlined-multiline-static"
                label={window.i18n('configContent')}
                multiline
                fullWidth
                rows={25}
                defaultValue={sitesData}
                inputRef={input => sitesDataInput = input}
            />
            <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="select-helper-label">{window.i18n('presetCss')}</InputLabel>
                <Select
                    labelId="select-helper-label"
                    id="select-helper"
                    value={presetCss}
                    label="Css"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Default</MenuItem>
                    <MenuItem value={1}>Light</MenuItem>
                </Select>
                <FormHelperText>{window.i18n('presetCssTips')}</FormHelperText>
            </FormControl>
            <TextField
                id="styleText"
                label={window.i18n('customCss')}
                multiline
                fullWidth
                sx={{mb : 1}}
                rows={25}
                value={cssText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCssText(event.target.value);
                }}
            />
            <TextField
                id="fontAwesomeCss"
                label={window.i18n('fontAwesomeCss')}
                fullWidth
                sx={{mb : 5}}
                rows={25}
                value={fontAwesomeCss}
                placeholder="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFontAwesomeCss(event.target.value);
                }}
            />
            <SpeedDial
                ariaLabel="SpeedDial"
                sx={{ position: 'fixed', bottom: '20%', right: 16 }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction
                    key='Save'
                    icon=<SaveIcon />
                    tooltipTitle={window.i18n('save')}
                    onClick = {saveConfig}
                />
                <SpeedDialAction
                    key='Copy'
                    icon=<FileCopyIcon />
                    tooltipTitle={window.i18n('copy')}
                    onClick = {copyConfig}
                />
                <UploadSpeedDialAction
                    key='Import'
                    icon=<FileUploadIcon />
                    tooltipTitle={window.i18n('import')}
                    onChange = {importConfig}
                />
                <SpeedDialAction
                    key='Export'
                    icon=<FileDownloadIcon />
                    tooltipTitle={window.i18n('export')}
                    onClick = {exportConfig}
                />
            </SpeedDial>
        </Box>
    );
}