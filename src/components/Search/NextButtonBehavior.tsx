import Icon from "@mdi/react";
import { useContext, useEffect, useState } from "react";
import UITypography from "../UI/dataDisplay/Typography";
import UIButton from "../UI/fields/Button";
import UISwitch from "../UI/fields/Switch";
import { mdiPlaylistEdit, mdiFilterMenuOutline, mdiFilterOffOutline } from '@mdi/js';
import Hidden from "../UI/dataDisplay/Hidden";
import UISelect from "../UI/fields/Select";
import UIMenuItem from "../UI/fields/MenuItem";
import { uid } from "../../commun/utils";
import UIFormControl from "../UI/fields/FormControl";
import { NoticeContext } from "../../contexts/notice";
import { Registry } from "../../services/db/Registry";
import { LoaderContext } from "../../contexts/loader";
import { ListsCollection } from "../../services/db/Lists";
import { dataTypes } from "../../commun/utils/types";
import { Texts } from "../../__config";

const registry = new Registry('records');
const listsCollection = new ListsCollection();

const NextButtonBehavior = ({ behavior, setBehavior, listId }: { listId: string, behavior: 'addOrDecreaseOne' | 'nextOfQueue', setBehavior: (b: 'addOrDecreaseOne' | 'nextOfQueue') => void }) => {
  const placeholder = 'Selecione um status';
  const [selectedStatus, setSelectedStatus] = useState(placeholder);
  const [statusFilter, setStatusFilter] = useState(false);
  const [, dispatchNotice] = useContext(NoticeContext);
  const [, dispatchLoader] = useContext(LoaderContext);

  useEffect(() => {
    if(behavior === 'nextOfQueue' && placeholder === selectedStatus) {
      dispatchNotice({ type: 'GENERIC', payload: { hiddenStatus: false, message: 'Seleocione um status na lista.' } });
      return;
    } 
    dispatchNotice({ type: 'RESET' });
    if (behavior === 'nextOfQueue' && placeholder !== selectedStatus) {
      dispatchLoader({ type: 'LOADING' });
      registry
      .selectByDocField('lastStatus', [selectedStatus])
      .then(async reg => {
        localStorage.setItem('ids', JSON.stringify(reg.docsIds()));
        dispatchNotice({ type: 'GENERIC', payload: { hiddenStatus: false, message: `Quantidade de itens encontrados: ${reg.docsIds()?.length}.` } });
        (await listsCollection.selectById(listId)).update({ configOfButtonNext: { behavior, status: selectedStatus } })
        dispatchLoader({ type: 'DONE' });
      })
    }
  }, [behavior, selectedStatus, dispatchLoader, dispatchNotice, listId]);
  
  const handleToggle = (boo: boolean) => {
    
    setStatusFilter(boo);
    if (boo) {
      setBehavior('nextOfQueue');
      return;
    }
    
    setBehavior('addOrDecreaseOne');
    localStorage.removeItem('ids');
    setSelectedStatus(placeholder);
    dispatchNotice({ type: 'RESET' });
  }
  return (
    <>
      <div>
        <UIButton title="Navegue pelos contatos com o mesmo status." sx={{ marginBottom: 0.7 }} onClick={() => handleToggle(dataTypes.invert(statusFilter))}>
          <Icon style={{ verticalAlign: 'middle' }} path={(statusFilter) ? mdiFilterMenuOutline : mdiFilterOffOutline} size={1} />
          <UISwitch
            checked={behavior === 'nextOfQueue'}
          /> 
        </UIButton>
      </div>


      <Hidden status={behavior === 'addOrDecreaseOne'}>
        <Hidden status={selectedStatus === placeholder}>
          <UIButton sx={{ marginRigth: 0 }} onClick={() => setSelectedStatus(placeholder)}>
            <Icon title='Clique para escolher outro status' path={mdiPlaylistEdit} size={1} />
          </UIButton>
          <UITypography color='#909090' variant="caption">Status selecionado: </UITypography> 
          <UITypography variant="caption">
            {selectedStatus}
          </UITypography>
        </Hidden>

        <Hidden  status={selectedStatus !== placeholder}>
          <UIFormControl>
            <UISelect
            size="small"
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value as string)}
            >
              <UIMenuItem disabled value={placeholder}><em>{placeholder}</em></UIMenuItem>
              {
                Texts.status.map(item =>
                <UIMenuItem 
                key={uid()} 
                value={item}
                >
                  {item}
                </UIMenuItem>
                )
              }
            </UISelect>
          </UIFormControl>
        </Hidden>
      </Hidden>
    </>
      
      
  );
}
export default NextButtonBehavior;
