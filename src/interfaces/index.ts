import React from "react";
import { IHistoryStatus } from "../types";

export interface INotice {
  hiddenStatus?: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  children?: React.ReactNode;
};
export interface NoticeAction {
  type: string;
  payload?: INotice;
}
export interface IList {
  name: string;
  beginning: number;
  end: number;
  lastItemUpdated: number;
  configOfButtonNext: {
    behavior: string;
    status: IHistoryStatus;
  }
};

export interface LoaderState { loading: boolean };
export interface LoaderAction { type: string, payload?: LoaderState };
