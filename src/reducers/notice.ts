
import { INotice, NoticeAction } from '../interfaces';

export default function noticeReducer(state: INotice, action: NoticeAction): INotice {
  const resetState: INotice = {
    "message": "",
    "hiddenStatus": true,
    "severity": "info",
    "children": undefined
  }
  switch (action.type) {
    case 'SUCCESS':
      return { ...state, hiddenStatus: false, severity: "success", ...action?.payload };
    case 'ERROR':
      return { ...resetState, hiddenStatus: false, severity: 'error', ...action?.payload };
    case 'GENERIC':
      return { ...resetState, ...action.payload };
    case 'RESET':
      return { ...resetState };
    default:
      throw new Error(`The type "${action.type}" <action.type> don't exist.`);
  }
}
