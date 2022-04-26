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

export interface LoaderState { loading: boolean, message?: string; };
export interface LoaderAction { type: string, payload?: LoaderState };


export interface IAddress {
  street?: string;
  number?: number | string;
  city?: string;
  state?: string;
  zipCode?: string;
}
export interface IContactPhones {
  callNumber?: number;
  messagesNumber?: number;
}
export interface IRegistry {
  name?: string;
  contactPhones?: IContactPhones;
  address?: IAddress;
}

export interface IComment {
  message?: string;
  status: IHistoryStatus;
  timestamp: number;
}