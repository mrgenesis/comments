
import { useNavigate } from 'react-router-dom';
import { uid, addOrDecreaseOne } from '../../commun/utils';
import { IList } from '../../interfaces';
import UIChip from '../UI/dataDisplay/Chip';


const DisplayLists:  React.FunctionComponent<{ lists: IList[] }>  = ({ lists }) => {
  const navegate = useNavigate();

  const handleSelectedList = (list: IList) => {
    localStorage.removeItem(list.name);
    localStorage.setItem(list.name, JSON.stringify(list));
    const getRegistry = addOrDecreaseOne(list);
    navegate(`/comments/${getRegistry('more')}?listId=${list.name}&beginning=${list.beginning}&end=${list.end}&isPhoneNumberId=${list.isPhoneNumberId}`);
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
          label={list.name} 
          />
        );
      })}
    </>
  );
}


export default DisplayLists;