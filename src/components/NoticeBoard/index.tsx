import { useContext } from 'react';
import UIStack from "../UI/layout/Stack";
import UIAlert from "../UI/feedback/Alert";

import Hidden from '../UI/dataDisplay/Hidden';
import { NoticeContext } from '../../contexts/notice';

const NoticeBoard = () => {
  const [state,dispatch] = useContext(NoticeContext);
  return (
    <Hidden status={state.hiddenStatus} mode='visibility'>
      <UIStack sx={{ width: '100%' }} spacing={2}>
        <UIAlert onClose={() => dispatch({ type: 'RESET' })} severity={state.severity || 'info'}>{state.message} {state.children || ''}</UIAlert>
      </UIStack>
    </Hidden>
  );
}

export default NoticeBoard;
