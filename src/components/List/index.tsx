import React, { useContext, useEffect, useState } from 'react';
import { LoaderContext } from '../../contexts/loader';
import { IList } from '../../interfaces';
import Hidden from '../UI/dataDisplay/Hidden';
import ListAdd from './Add';
import DisplayLists from './DisplayLists';

import { ListsCollection } from '../../services/db/Lists';
const listsCollection = new ListsCollection();

const List: React.FunctionComponent<{}> = () => {
  const [stateLoading, dispatch] = useContext(LoaderContext);
  const [lists, setLists] = useState<IList[]>([]);
  
  useEffect(() => {
    dispatch({ type: 'LOADING' });
    listsCollection.onQuerySnapshot(lists => {
      setLists(lists);
    });
    listsCollection.selectAllDocs().then(() => {
      setLists(listsCollection.docsData());
      dispatch({ type: 'DONE' });
    });
  }, []);
  
  return (
    <>
      <Hidden status={stateLoading.loading}>
        <DisplayLists lists={lists} />
      </Hidden>
      <hr />
      <p>Adicione uma nova lista:</p>
      <ListAdd />
    </>
  );
}


export default List;