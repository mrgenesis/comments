
import { useNavigate } from 'react-router-dom';
import { uid } from '../../commun/utils';
import { generateContactLink } from '../../commun/utils/generate-contact-link';
import { IList } from '../../interfaces';
import UIChip from '../UI/dataDisplay/Chip';


const DisplayLists:  React.FunctionComponent<{ lists: IList[] }>  = ({ lists }) => {
  const navegate = useNavigate();

  const handleSelectedList = (list: IList) => {
    const nextItem = (list.configOfButtonNext[list.configOfButtonNext.behavior]?.nextItem || ++list.lastItemUpdated);
    navegate(generateContactLink(list, nextItem as string));
  }
  
  const generateTitel = {
    'Sequencial': (dataList: IList) => `Início: ${dataList.beginning}; Fim: ${dataList.end}; Gera link do WhatsApp: ${(dataList.isPhoneNumberId === '1') ? 'Sim' : 'Não'}`
  }
  return (
    <>
      <p>Clique em uma das listas.</p>
      {lists.map(list => {
        return (
          <UIChip
          title={generateTitel['Sequencial'](list)} 
          key={uid()} 
          sx={{ margin: 0.3 }} 
          onClick={() => handleSelectedList(list)} 
          label={list.listId} 
          />
        );
      })}
    </>
  );
}


export default DisplayLists;