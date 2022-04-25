
import UIMenuItem from "../UI/fields/MenuItem";
import UISelect from "../UI/fields/Select";
import UITextField from "../UI/fields/TextField";
import { uid } from "../../commun/utils";
import UIButton from "../UI/fields/Button";
import UIFormControl from "../UI/fields/FormControl";

import React, { useContext, useState } from "react";
import { LoaderContext } from "../../contexts/loader";
import { NoticeContext } from "../../contexts/notice";
import { IHistoryStatus } from "../../types";
import { Registry } from "../../services/db/Registry";
import UIDivider from "../UI/dataDisplay/Divider";

import { Comment, CommentCollection } from "../../services/db/Comment";
import { ListsCollection } from "../../services/db/Lists";

const statusList: IHistoryStatus[] = 
['Caixa Postal', 'Número não existe', 'Desligou inesperadamente', 'Ninguém atende', 'Ligação efetuada', 'Ocupado', 'Reação positiva', 'Não domostrou reação', 'Revisita'];

const registry = new Registry('records');
const listsCollection = new ListsCollection();

export default function CommentsAdd({ clientId, listId }: { clientId: number, listId: string }) {
  const [state, dispatch] = useContext(LoaderContext);
  const [, dispatchNotice] = useContext(NoticeContext);
  const [status, setStatus] = useState<IHistoryStatus>('');
  const [message, setMessage] = useState('');

  const commentCollection = new CommentCollection(clientId);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    dispatch({ type: 'LOADING' });
    e.preventDefault();
    if (status === '') {
      dispatch({ type: 'DONE' });
      return dispatchNotice({ type: 'GENERIC', payload: { message: 'O status deve ser preenchido.', severity: 'warning', hiddenStatus: false } });
    }
    const data = new Comment({ status, message });    
    
    try {  
      await commentCollection.create({ ...data }); // Save a new comment

      await listsCollection.selectById(listId);
      await listsCollection.update({ lastItemUpdated: clientId });

      await registry.selectById(String(clientId));
      await registry.update({ lastStatus: data.status });
    } catch (err: any) {      
      dispatchNotice({ type: 'ERROR', payload: { hiddenStatus: false, message: err.message, severity: 'error' } });
      console.error('console.error(err.message)', err);
    } finally {
      setStatus('');
      setMessage('');
      dispatch({ type: 'DONE' });
    }
  }
  
  return (
    <>
      <UIDivider sx={{ margin: '10px 0 5px 0' }} />
      <form onSubmit={handleSubmit}>
        <UIFormControl fullWidth>
          <UISelect disabled={state.loading}
          onChange={(e) => setStatus(e.target.value as IHistoryStatus)} 
          value={status === '' ? 'Escolha um Status' : status}
          >
            <UIMenuItem
            disabled={true}
            value={'Escolha um Status'}
            >
              Escolha um Status
            </UIMenuItem>
            {
              statusList.map(statusName => 
                <UIMenuItem 
                key={uid()} 
                value={statusName}
                >
                  {statusName}
                </UIMenuItem>
              )
            }
          </UISelect>
        </UIFormControl>
        <UIFormControl fullWidth>
          <UITextField disabled={state.loading} label='Digite uma mensagem' multiline value={message} onChange={(e) => setMessage(e.target.value)} />
        </UIFormControl>
        <UIFormControl fullWidth> 
          <UIButton disabled={state.loading} type="submit">Salvar</UIButton>
        </UIFormControl>     
      </form>
      <UIDivider />
    </>
  );
}
