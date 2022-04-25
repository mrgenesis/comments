import React, { createContext } from 'react';

import { LoaderAction, LoaderState } from '../interfaces';

const initState: LoaderState = { loading: false };
const temporaryFun: React.Dispatch<LoaderAction> = (action: LoaderAction) => void {};

export const LoaderContext = createContext<[i: LoaderState, dispatch: React.Dispatch<LoaderAction>]>([initState, temporaryFun]);
