import { TextFieldProps } from "@mui/material";
import React from "react";
import UIButton from "../UI/fields/Button";
import UITextField from '../UI/fields/TextField';
import Icon from '@mdi/react'
import { mdiContentSave, mdiClose  } from '@mdi/js';

const RegistryEditField: React.FC<TextFieldProps & {
  value: any,
  save: () => void,
  exitField: () => void,  
}> = ({ label, value, ...props }) => {
  return (
    <>
      <UITextField 
        onChange={props.onChange} 
        variant="standard" 
        size="small" 
        label={label} 
        value={value} 
        InputProps={{ 
          endAdornment: <><UIButton title="Salvar" onClick={() => props.save()}><Icon path={mdiContentSave} size={0.7} /></UIButton><UIButton title="Sair sem salvar" onClick={() => props.exitField()}><Icon path={mdiClose} size={0.7} /></UIButton></>
        }} />
    </>
  );
}
export default RegistryEditField;
