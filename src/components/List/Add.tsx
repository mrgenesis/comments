import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoaderContext } from '../../contexts/loader';
import UIButton from '../UI/fields/Button';
import UIFormControl from '../UI/fields/FormControl';
import UITextField from '../UI/fields/TextField';

import { ListsCollection } from '../../services/db/Lists';
import { NoticeContext } from '../../contexts/notice';
// import { ListTypes, IsPhoneNumberId } from '../../types';

const listsCollection = new ListsCollection();

const ListAdd: React.FunctionComponent<{}> = () => {
  const [state, dispatch] = useContext(LoaderContext);
  const [, dispatchNotice] = useContext(NoticeContext);
  const [listName, setListName] = useState('');
  
  // const [listType, setListType] = useState<ListTypes>('Sequencial');
  const listType = 'Sequencial';
  // const [isPhoneNumberId, setIsPhoneNumberId] = useState<IsPhoneNumberId>('1');
  const isPhoneNumberId = '1';

  let [beginning, setBeginning] = useState(0);
  const [end, setEnd] = useState(0);
  const navegate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    dispatch({ type: 'LOADING' });
    e.preventDefault();
    try {
      dispatchNotice({ type: 'RESET' });
      await listsCollection.create({ listType, isPhoneNumberId, beginning, end, lastItemUpdated: (beginning - 1), name: listName, configOfButtonNext: { status: '', behavior: '' }  }, listName);
      navegate('/');
      setListName('');
      setBeginning(0);
      setEnd(0);
    } catch(err: any) {
      const errorMessage = err.message;
      dispatchNotice({ type: 'GENERIC', payload: { hiddenStatus: false, severity: 'error', message: `Contate o suporte ou tente seguir as instruções da mensagem a seguir: "${errorMessage}"` } });
      console.log('mensagem de erro', err);
    }    
    dispatch({ type: 'DONE' });
  }
  return (
    <>  
      <form onSubmit={handleSubmit}>
        <UIFormControl>
          <UITextField disabled={state.loading} value={listName} onChange={(e) => setListName(e.target.value)} label='Nome da lista' />
        </UIFormControl>
        <UIFormControl>
          <UITextField disabled={state.loading} value={beginning || ''} onChange={(e) => setBeginning(e.target.value as unknown as number)} label='Número inicial' type='number' />
        </UIFormControl> 
        <UIFormControl>
          <UITextField disabled={state.loading} value={end || ''} onChange={(e) => setEnd(e.target.value as unknown as number)} label='Número final' type='number' />
        </UIFormControl>  
        <UIFormControl>
          <UITextField value={beginning || ''} disabled label='Início das atividades' />
        </UIFormControl>  
        <UIFormControl>
          <UIButton disabled={state.loading} type="submit">Criar nova lista</UIButton>
        </UIFormControl>  
      </form>
    </>
  );
}


export default ListAdd;
