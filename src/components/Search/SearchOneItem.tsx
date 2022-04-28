import { useSearchParams } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from "react";
import { LoaderContext } from "../../contexts/loader";
import { NoticeContext } from "../../contexts/notice";

import { collectionsNames } from "../../__config";
import { Registry } from "../../services/db/Registry";
import { ListsCollection } from "../../services/db/Lists";
import SearchNextOrPreview from "./SearchNextOrPreview";
import { generateContactLink } from "../../commun/utils/generate-contact-link";
import { IList } from "../../interfaces";

const registry = new Registry(collectionsNames.RECORDS);
const listsCollection = new ListsCollection();

const SearchOneItem: React.FC<{ handleTransition: (v: 'less' | 'more') => any }> = ({ handleTransition }) => {
  const [, dispatchLoader] = useContext(LoaderContext);
  const [, dispatchNotice] = useContext(NoticeContext);
  const [searchField, setSeachFiel] = useState('');

  const [queryString] = useSearchParams();
  const listType = queryString.get('listType');  

  const handleSearching = async () => {
    try {
      dispatchLoader({ type: 'LOADING' });
      if (searchField === '') {
        throw new Error('O campo não pode ficar vazio. Preencha-o e tente de novo.');
      }
      await registry.selectById(searchField);
      if (registry.docSnap.exists()) {
        const data = registry.docSnap.data();
        await listsCollection.selectById(data?._config?.listId);
        dispatchNotice({ 
          type: 'GENERIC', 
          payload: {  
            children: <a href={generateContactLink(listsCollection.docSnap.data() as IList, registry.docSnap.id)}>Clique aqui para acessá-lo.</a>,
            hiddenStatus: false,
            message: `O registro "${searchField}" foi encontrado.`,
            severity: 'success'
          } 
        });
        generateContactLink(listsCollection.docSnap.data() as IList, registry.docSnap.id);
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
        <SearchNextOrPreview handleTransition={handleTransition} listType={listType as string} payload="less" />
          
        <InputBase 
        value={searchField}
        onChange={(e) => setSeachFiel(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Localize um registro pela ID"
        />

        <IconButton onClick={() => handleSearching()}>
          <Icon path={mdiMagnify} size={1} title='Clique para localizar um item' />
        </IconButton>

        <SearchNextOrPreview handleTransition={handleTransition} listType={listType as string} payload="more" />
      </Paper>
      <br />
    </>
  );
}

export default SearchOneItem;
