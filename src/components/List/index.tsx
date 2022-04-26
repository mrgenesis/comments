import { onSnapshot, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { LoaderContext } from '../../contexts/loader';
import { getCollection } from '../../services/db';
import { IList } from '../../interfaces';
import Hidden from '../UI/dataDisplay/Hidden';
import ListAdd from './Add';
import DisplayLists from './DisplayLists';


const List: React.FunctionComponent<{}> = () => {
  const [stateLoading, dispatch] = useContext(LoaderContext);
  const [lists, setLists] = useState<IList[]>([]);
  
  useEffect(() => {
    dispatch({ type: 'LOADING' });
    let listNames: IList[] = [];
    const listsCollRef = getCollection('lists');
    const q = query(listsCollRef);

    onSnapshot(q, (snapshot) => {
      listNames = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        listNames.push({ name: doc.id, beginning: data.beginning, end: data.end, lastItemUpdated: data.lastItemUpdated, configOfButtonNext: data.configOfButtonNext })
      });
      setLists(listNames);
      dispatch({ type: 'DONE' });
    });
  }, [dispatch]);
  
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