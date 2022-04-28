
import React, { useContext, useState } from 'react';
import UIChip from '../UI/dataDisplay/Chip';
import UITypography from '../UI/dataDisplay/Typography';
import Icon from '@mdi/react';
import { mdiForumOutline, mdiPhoneOutgoing, mdiCellphoneMessage } from '@mdi/js';
import Hidden from '../UI/dataDisplay/Hidden';
import { LoaderContext } from '../../contexts/loader';
import RegistryEditField from './EditField';
import { dataTypes } from '../../commun/utils/types';

import { IRegistry } from '../../interfaces';

const Registry: React.FC<IRegistry & { id: string, updateFields: (fields: any) => Promise<any> }> = ({ id, updateFields, name, contactPhones, address }) => {
  const haveMessageContats = Boolean(contactPhones?.messagesNumber);
  const [stateLoader] = useContext(LoaderContext);
  const [statusFields, setStatusFields] = useState<any>();

  const handleClick = (data: any) => setStatusFields(data);
  const handleChange = (value: any) => setStatusFields({ ...statusFields, value });
  const save = () => updateFields({ [statusFields.field]: statusFields.value }).then(_ => setStatusFields({}));
  const off = () => setStatusFields({});

  return (
    <Hidden status={stateLoader.loading} mode='visibility'>  
      <UITypography 
        variant='caption' 
        variantMapping={{ caption: 'p' }}
      >
        Registro referente à ID <b>{id}</b><br />
      </UITypography>

      {
        dataTypes.expect(statusFields?.field).toBeDifferentOf('name')
        ? <UITypography 
            sx={{ marginRight: 2 }} 
            variant='caption'
            >
            Nome: <UIChip 
              label={name} 
              onClick={() => handleClick({ field: 'name', value: name, label: 'Edite o nome' })} 
              size='small'
              />
          </UITypography>
        : <>
            <RegistryEditField 
                save={() => save()}
                exitField={() => off()} 
                onChange={(e) => handleChange(e.target.value)} 
                label={statusFields?.label} 
                value={statusFields?.value || ''} 
              />
          </>
      }

      {
        dataTypes.expect(statusFields?.field).toBeDifferentOf('contactPhones')
        ? <UITypography 
            variant='caption'
          >
            Contatos: <UIChip 
              disabled={haveMessageContats}
              icon={
                <>
                  <Icon path={mdiPhoneOutgoing} size={0.7} title='Disponível para chamadas' />
                  {haveMessageContats ? '' : <Icon path={mdiCellphoneMessage} size={0.7} title='Disponível para envio de Whatsapp' />}
                </>
              }
              
              label={id} 
              onClick={() => handleClick({ field: 'contactPhones', value: contactPhones?.messagesNumber, label: 'WhatsApp' })} 
              size='small'
              />
              {
                (haveMessageContats)
                ? (<UIChip 
                    icon={<Icon path={mdiCellphoneMessage} size={0.7} title='Disponível para envio de Whatsapp' />}
                    label={contactPhones?.messagesNumber} 
                    onClick={() => handleClick({ field: 'contactPhones', value: contactPhones, label: 'WhatsApp' })} 
                    size='small'
                      />)
                  : ''
              }
              <a style={{ verticalAlign: 'bottom' }} target='_blank' rel="noopener noreferrer" href={`https://wa.me/55${contactPhones?.messagesNumber || contactPhones?.callNumber}`}><Icon path={mdiForumOutline} size={0.5} title={`Envie uma mensagem via WhatsApp para ${contactPhones?.messagesNumber || contactPhones?.callNumber}`} /></a>
          </UITypography>
        : <>
            <RegistryEditField 
              save={() => save()}
              exitField={() => off()} 
              onChange={(e) => handleChange({ callNumber: id, messagesNumber: e.target.value})} 
              label={statusFields?.label} 
              value={statusFields?.value?.messagesNumber || ''} 
            />
          </>
      }
      {
        dataTypes.expect(statusFields?.field).toBeDifferentOf('address')

        ? <UITypography 
            sx={{ marginRight: 2 }} 
            variant='caption'
            variantMapping={{ caption: 'div' }}
          >
            Cidade: <UIChip 
              label={address?.city} 
              onClick={() => handleClick({ field: 'address', value: address, label: 'Edite a cidade' })} 
              size='small'
              />
          </UITypography>
        : <RegistryEditField 
            save={() => save()}
            exitField={() => off()} 
            onChange={(e) => handleChange({ ...address, city: e.target.value })} 
            label={statusFields?.label} 
            value={statusFields?.value?.city || ''} 
          />
      }
      
    </Hidden>
  );
}

export default Registry;
