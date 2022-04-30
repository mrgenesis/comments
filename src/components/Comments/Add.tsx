
import UIMenuItem from "../UI/fields/MenuItem";
import UISelect from "../UI/fields/Select";
import UITextField from "../UI/fields/TextField";
import { uid } from "../../commun/utils";
import UIButton from "../UI/fields/Button";
import UIFormControl from "../UI/fields/FormControl";
import Icon from '@mdi/react';
import { mdiFormatListChecks } from '@mdi/js';

import React, { useContext, useState } from "react";
import { LoaderContext } from "../../contexts/loader";
import { NoticeContext } from "../../contexts/notice";
import { IHistoryStatus } from "../../types";
import { Registry } from "../../services/db/Registry";

import { Comment, CommentCollection } from "../../services/db/Comment";
import { ListsCollection } from "../../services/db/Lists";
import { Texts } from "../../__config";

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
      return dispatchNotice({ type: 'GENERIC', payload: { message: 'Escolha um status antes de salvar. Não é possível adicionar um registro com status vazio.', severity: 'warning', hiddenStatus: false } });
    }
    const comment = new Comment({ status, message });    
    
    try {  
      await commentCollection.create(comment.data); // Save a new comment

      await listsCollection.selectById(listId);
      await listsCollection.update({ lastItemUpdated: clientId });

      await registry.selectById(String(clientId));
      await registry.update({ lastStatus: comment.status });
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
      <form onSubmit={handleSubmit} style={{ marginBottom: 20, width: '100%' }}>
        <UIFormControl fullWidth>
          <UISelect disabled={state.loading}
          onChange={(e) => setStatus(e.target.value as IHistoryStatus)} 
          value={status === '' ? 'Escolha um Status' : status}
          >
            <UIMenuItem
            disabled={true}
            value={'Escolha um Status'}
            >
              <Icon style={{ verticalAlign: 'middle' }} path={mdiFormatListChecks} size={0.8} title='' /> Escolha um Status *
            </UIMenuItem>
            {
              Texts.status.map(statusName => 
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
          <UITextField disabled={state.loading} label='Texto do comentário (opicional)' multiline value={message} onChange={(e) => setMessage(e.target.value)} />
        </UIFormControl>
        <UIFormControl fullWidth> 
          <UIButton variant="outlined" disabled={state.loading} type="submit">Adicionar registro</UIButton>
        </UIFormControl>     
      </form>---
    </>
  );
}
