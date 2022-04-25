import React, { useReducer, useContext } from 'react';
import { LoaderContext } from '../contexts/loader';
import loaderReducer from '../reducers/loader';

import Loader from '../components/Loader';
import Hidden from '../components/UI/dataDisplay/Hidden';
import { dataTypes } from '../commun/utils/types';


const LoaderStorage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [init] = useContext(LoaderContext);
  const [state, dispatch] = useReducer(loaderReducer, init);
  return (
    <LoaderContext.Provider value={[state, dispatch]}>
      <Hidden mode='visibility' status={dataTypes.invert(state.loading)}>
        <Loader message={state?.message || 'O sistema está carregando os dados...'} />
      </Hidden>
      { children }
    </LoaderContext.Provider>
  );
}
export default LoaderStorage;
