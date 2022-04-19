

import UISelec from './Select';
import UIInputLabel from './InputLabel';
import UIMenuItem from './MenuItem';
import UIFormControl from './FormControl';
import { FormControlProps, MenuItemProps, InputLabelProps, SelectProps } from '@mui/material';

import { uid } from '../../../commun/utils';

type dataType = any;
interface IBundledSelectProps {
  value: dataType;
  setValue: (v: dataType) => void
  optionsToSelect: dataType[];
  label?: string;
  placeholder?: string;
}

const UIFormControlPros: FormControlProps = {};

const labelId = uid({ readableName: 'UIInputLabel'});
const UIInputLabelPros: InputLabelProps = {
  id: labelId
};

const UISelecPros: SelectProps = {
  id: uid({ readableName: 'UISelec'}),
  labelId: labelId,
};

const UIMenuItemPros: MenuItemProps = {

};


export default function BundledSelect({ placeholder, optionsToSelect, value, setValue, label }: IBundledSelectProps) {
  return (
      <UIFormControl>
        { label ? <UIInputLabel { ...UIInputLabelPros }>{label}</UIInputLabel> : '' }
        <UISelec { ...UISelecPros }
          displayEmpty
          value={value}
          label="Age"
          onChange={(e) => setValue(e.target.value)}
        >
          {
            placeholder 
              ? <UIMenuItem disabled value=""><em>{placeholder}</em></UIMenuItem>
              : ''
          }
          {optionsToSelect.map(item => <UIMenuItem key={uid()} value={item}>{item}</UIMenuItem>)}
        </UISelec>
      </UIFormControl>
  );
}
