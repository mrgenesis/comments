import React, { useReducer, useContext } from "react";

import { NoticeContext } from '../contexts/notice';
import noticeReducer from '../reducers/notice';
import NoticeBoard from "../components/NoticeBoard";

const NoticeStore: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [initState] = useContext(NoticeContext);  
  const [state, dispatch] = useReducer(noticeReducer, initState);
  return (
    <NoticeContext.Provider value={[state, dispatch]}>
      <NoticeBoard />
      {children}
    </NoticeContext.Provider>
  );
}

export default NoticeStore;
