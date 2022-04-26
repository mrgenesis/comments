
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
    navegate(`/comments/${getRegistry('more')}?listId=${list.name}`);
  }
  return (
    <>
      <p>Clique em uma das listas.</p>
      {lists.map(list => {
        return (
          <UIChip 
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