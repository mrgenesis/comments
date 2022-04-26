import { IconButton, InputBase, Paper } from "@mui/material";
import { mdiMagnify } from '@mdi/js';
import UIIconButton from "../UI/fields/IconButton";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useContext, useState } from "react";
import { LoaderContext } from "../../contexts/loader";
import { NoticeContext } from "../../contexts/notice";

import { collectionsNames } from "../../__config";
import { Registry } from "../../services/db/Registry";

const registry = new Registry(collectionsNames.RECORDS);

const SearchOneItem: React.FC<{ handleTransition: (v: 'less' | 'more') => any }> = ({ handleTransition }) => {
  const [, dispatchLoader] = useContext(LoaderContext);
  const [, dispatchNotice] = useContext(NoticeContext);
  const [searchField, setSeachFiel] = useState('');
  const handleSearching = async () => {
    try {
      dispatchLoader({ type: 'LOADING' });
      await registry.selectById(searchField);
      if (registry.docSnap.exists()) {
        const data = registry.docSnap.data();
        dispatchNotice({ 
          type: 'GENERIC', 
          payload: {  
            children: <a href={`/comments/${registry.docSnap.id}?listId=${data?._config?.listId}`}>Clique aqui para acessá-lo.</a>,
            hiddenStatus: false,
            message: `O registro "${searchField}" foi encontrado.`,
            severity: 'success'
          } 
        });
        setSeachFiel('');
        return;
      }
      dispatchNotice({ 
        type: 'GENERIC', 
        payload: {  
          hiddenStatus: false,
          message: `Nenhum registro encontrado para a ID "${searchField}".`,
          severity: 'info'
        } 
      });
    } catch(err: any) {
      console.error('Error do sistema:', err);
      dispatchNotice({ type: 'ERROR', payload: { message: err.message } });
    } finally {      
      dispatchLoader({ type: 'DONE' });
    }      
  }
  return (
    <>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <UIIconButton onClick={() => handleTransition('less')}>
          <Icon path={mdiChevronLeft} size={1} title='Item imediatamente anterior (-1)' />
        </UIIconButton>
          
        <InputBase 
        value={searchField}
        onChange={(e) => setSeachFiel(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Localize um registro pela ID"
        />

        <IconButton onClick={() => handleSearching()}>
          <Icon path={mdiMagnify} size={1} title='Clique para localizar um item' />
        </IconButton>

        <UIIconButton onClick={() => handleTransition('more')}>
          <Icon path={mdiChevronRight} size={1} title='Item imediatamente posterior (+1)' />
        </UIIconButton>
      </Paper>
      <br />
    </>
  );
}

export default SearchOneItem;
