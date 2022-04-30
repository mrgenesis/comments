
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

import { Registry as RegistryCollection } from "../../services/db/Registry";
import { generateContactLink } from "../../commun/utils/generate-contact-link";
import { IList } from "../../interfaces";
import { urlValidation } from "./urlValidation";

const registryCollection = new RegistryCollection('records');

export default function CommentsPage() {
  const { clientId } = useParams();
  const clientId_n = convert.fromString(clientId).toNumber();

  const [queryString] = useSearchParams();
  const urlSearshParams: any = {};
  queryString.forEach((value, key) => {
    urlSearshParams[key] = value;
  });

  const navegate = useNavigate();
  const [, dispatchLoader] = useContext(LoaderContext);
  const [, dispatchNoiceBoard] = useContext(NoticeContext);
  

  const [behavior, setBehavior] = useState<'addOrDecreaseOne' | 'nextOfQueue'>('addOrDecreaseOne');
  const [registry, setRegistry] = useState<DocumentData>({});

  const [loadId, setLoadId] = useState(true);
  
  const updateFields = (fields: any): Promise<void> => {
    return registryCollection.update(fields);
  }
  
  useEffect(() => {
    if (dataTypes.expect(loadId).theSameAs(true)) {
      try {
        setLoadId(false);
        urlValidation(urlSearshParams);

        dispatchLoader({ type: 'LOADING' });    
      
        registryCollection.selectById(clientId as string).then(() => {
          registryCollection.onDocSnapshot(registry => {
            setRegistry(registry);
            dispatchLoader({ type: 'DONE' });
          });
        })
        .catch(err => console.error('registryCollection:', err))
        .finally(() => {
          registryCollection.firstSave(urlSearshParams.listId);
        });
      
      } catch(err: any) {
        console.error(err);
        dispatchNoiceBoard({ type: 'ERROR', payload: { children: <a href="/">Página de listas</a>, message: `${err.message} Na maioria dos casos é possível corrigir isso voltando à página para selecionar a lista.` } })
      }
    }
  }, [loadId, clientId, dispatchLoader, dispatchNoiceBoard]);

  const handleTransition = (option: 'less' | 'more') => {
    const behaviors = {
      addOrDecreaseOne: () => {
        const getRegistry = addOrDecreaseOne({ ...urlSearshParams, clientId_n });
        return getRegistry(option);
      },
      nextOfQueue: () => nextOfQueue(option, clientId as string, dispatchNoiceBoard)
    }
    navegate(generateContactLink(urlSearshParams as IList, behaviors[behavior]()));
    setLoadId(true);
  }

  return (
    <>
      <NextButtonBehavior listId={urlSearshParams.listId as string} behavior={behavior} setBehavior={setBehavior} />
      <SearchOneItem handleTransition={handleTransition} />
      <CommentsAdd clientId={clientId_n} listId={urlSearshParams.listId as string} />
      <Registry id={clientId as unknown as string} updateFields={updateFields} { ...registry } />
      <CommentsHistory docId={clientId as string} loadId={loadId} />
    </>
  );

}
