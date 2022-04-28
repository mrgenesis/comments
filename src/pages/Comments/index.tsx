
import Registry from "../../components/Registry";
import SearchOneItem from "../../components/Search/SearchOneItem";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { convert } from "../../commun/utils/convert";
import { LoaderContext } from "../../contexts/loader";
import { DocumentData } from "firebase/firestore";
import { dataTypes } from "../../commun/utils/types";
import CommentsAdd from "../../components/Comments/Add";
import CommentsHistory from "../../components/Comments/CommentHistory";
import { NoticeContext } from "../../contexts/notice";
import { addOrDecreaseOne, nextOfQueue } from "../../commun/utils";
import NextButtonBehavior from "../../components/Search/NextButtonBehavior";

import { CommentCollection } from "../../services/db/Comment";
import { Registry as RegistryCollection } from "../../services/db/Registry";

const registryCollection = new RegistryCollection('records');


export default function CommentsPage() {
  const { clientId } = useParams();
  const clientId_n = convert.fromString(clientId).toNumber();
  const [queryString] = useSearchParams();
  const listId = queryString.get('listId');
  const navegate = useNavigate();
  const [, dispatchLoader] = useContext(LoaderContext);
  const [, dispatchNoiceBoard] = useContext(NoticeContext);
  
  let listConfig: any = localStorage.getItem(listId as string);
  try {
    listConfig = JSON.parse(listConfig as string);
  } catch(err) {
    listConfig = null;
  }

  const [behavior, setBehavior] = useState<'addOrDecreaseOne' | 'nextOfQueue'>('addOrDecreaseOne');
  const [registry, setRegistry] = useState<DocumentData>({});
  const [historyComments, setHistoryComments] = useState<DocumentData[]>([]);

  const [loadId, setLoadId] = useState(true);
  
  const updateFields = (fields: any): Promise<void> => {
    return registryCollection.update(fields);
  }
  
  useEffect(() => {
    if (dataTypes.isNull(listConfig)) {
      dispatchNoiceBoard({ type: 'GENERIC', payload: { children: <a href='/'>Ir à tela inicial</a>, severity: 'warning', hiddenStatus: false, message: `Não consegui encontrar os dados da lista "${listId}". Normalmente isso acontece quando é a primeira vez que usa este navegador. Selecione a lista pela tela inicial para que o sistema carregue todas as informações.` } });
      return;
    }
    if (dataTypes.expect(loadId).theSameAs(true)) {
      setLoadId(false);
      dispatchLoader({ type: 'LOADING' });
      
      const commentCollection = new CommentCollection(clientId as string);
      commentCollection.setQuery({ queryConstraint: 'orderBy', fieldPath: 'timestamp', directionStr: "desc" });
      commentCollection.onSnapshotQuery(commentHistory => {
        setHistoryComments(commentHistory);
        dispatchLoader({ type: 'DONE' });
      });      
      
      registryCollection.selectById(clientId as string).then(() => {
        registryCollection.onSnapshotDoc(registry => {
          setRegistry(registry);
          dispatchLoader({ type: 'DONE' });
        });
      })
      .catch(err => console.error('registryCollection:', err))
      .finally(() => registryCollection.addListIdProperty(listId as string));
      
    }
  }, [loadId, clientId, listId, dispatchLoader, listConfig, dispatchNoiceBoard]);

  const handleTransition = (option: 'less' | 'more') => {
    const behaviors = {
      addOrDecreaseOne: () => {
        const getRegistry = addOrDecreaseOne({ ...listConfig, clientId_n });
        return getRegistry(option);
      },
      nextOfQueue: () => nextOfQueue(option, clientId as string, dispatchNoiceBoard)
    }
    navegate(`/comments/${behaviors[behavior]()}?listId=${listId}`);
    setLoadId(true);
  }

  return (
    <>
      <NextButtonBehavior listId={listId as string} behavior={behavior} setBehavior={setBehavior} />
      <SearchOneItem handleTransition={handleTransition} />
      <br />      
      <Registry id={clientId as unknown as string} updateFields={updateFields} { ...registry } />
      <CommentsAdd clientId={clientId_n} listId={listId as string} />
      <CommentsHistory history={historyComments} />
    </>
  );

}
