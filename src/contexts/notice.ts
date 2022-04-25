import React from "react";
import { INotice, NoticeAction } from '../interfaces';

const initialState: INotice = { message: '', hiddenStatus: true, severity: 'info' };
const temporaryFun: React.Dispatch<NoticeAction> = (action: NoticeAction) => void {};

export const NoticeContext = React.createContext<[state: INotice, dispatch: React.Dispatch<NoticeAction>]>([initialState, temporaryFun]);
