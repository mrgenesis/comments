
import Registry from "../../components/Registry";
import SearchOneItem from "../../components/Search/SearchOneItem";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { convert } from "../../commun/utils/convert";
import { addListIdProperty, getCommentCollection, getDocRef } from "../../services/db";
import { LoaderContext } from "../../contexts/loader";
import { DocumentData, DocumentReference, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { dataTypes } from "../../commun/utils/types";
import CommentsAdd from "../../components/Comments/Add";
import CommentsHistory from "../../components/Comments/CommentHistory";
import { NoticeContext } from "../../contexts/notice";
import { addOrDecreaseOne, nextOfQueue } from "../../commun/utils";
import NextButtonBehavior from "../../components/Search/NextButtonBehavior";

function useUpdateDocFields(docRef: DocumentReference) {
  return (fields: any) => {
    return getDoc(docRef).then(snap => {
      if(snap.exists()) {
        return updateDoc(docRef, { ...fields });
      }
      return setDoc(docRef, { ...fields });
    });
  }
}
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
  const registryRef = getDocRef(`records/${clientId}`);
  const updateFields = useUpdateDocFields(registryRef);
  const commentCollectionRef = getCommentCollection(clientId);
  const qCommentHistory = query(commentCollectionRef, orderBy('timestamp', 'desc'));
  
  useEffect(() => {
    if (dataTypes.isNull(listConfig)) {
      dispatchNoiceBoard({ type: 'GENERIC', payload: { children: <a href='/'>Ir à tela inicial</a>, severity: 'warning', hiddenStatus: false, message: `Não consegui encontrar os dados da lista "${listId}". Normalmente isso acontece quando é a primeira vez que usa este navegador. Selecione a lista pela tela inicial para que o sistema carregue todas as informações.` } });
      return;
    }
    if (dataTypes.expect(loadId).theSameAs(true)) {
      setLoadId(false);
      addListIdProperty(clientId as string, listId as string);
      dispatchLoader({ type: 'LOADING' });
      onSnapshot(registryRef, (snap) => {
        if(snap.exists()) {
          setRegistry(snap.data());
        } else {
          setRegistry({});
        }
        dispatchLoader({ type: 'DONE' });
      });
      let commentHistory: DocumentData[] = [];
      onSnapshot(qCommentHistory, snap => {
        //if (snap.empty) return;
        commentHistory = [];
        snap.docs.forEach(doc => commentHistory.push(doc.data()));
        setHistoryComments(commentHistory);
      });
    }
  }, [loadId]);

  const handleTransition = (option: 'less' | 'more') => {
    // const chose1 = 'addOrDecreaseOne';
    // const chose2 = 'nextOfQueue';
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
