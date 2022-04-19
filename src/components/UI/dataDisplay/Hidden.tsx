
import React from "react";

interface IHidden {
  mode?: 'visibility' | 'display';
  status: boolean;
  children: React.ReactNode;
}
const Hidden: React.FC<IHidden> = (props) => {
  const mode = props.mode || 'display';
  const modes = {
    visibility: 'hidden',
    display: 'none'
  };
  const style = props.status ? { [mode]: modes[mode] } : {};
  return (
    <div style={ { ...style } }>
      {props.children}
    </div>
  );
}

export default Hidden;
