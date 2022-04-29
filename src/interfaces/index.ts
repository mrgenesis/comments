import React from "react";
import { BehaviorOptionsButtonNext, IHistoryStatus, IsPhoneNumberId, ListTypes } from "../types";

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
export interface IConfigOfButtonNext {
  Sequencial: {
    nextItem: string | number;
  }
  'Por Status': {
    nextItem?: string | number;
    status?: IHistoryStatus;
  }
  behavior: BehaviorOptionsButtonNext;
}
export interface IList {
  listId: string;
  listType: ListTypes;
  isPhoneNumberId: IsPhoneNumberId;
  beginning: number;
  end: number;
  lastItemUpdated: number;
  configOfButtonNext: IConfigOfButtonNext;
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