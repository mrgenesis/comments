
import UIIconButton from "../UI/fields/IconButton";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const SearchNextOrPreview: React.FC<{ payload: 'more' | 'less', listType: string, handleTransition: (v: 'less' | 'more') => any }> = ({ payload, listType, handleTransition }) => {
  return (
    <>
      {  (listType === 'Sequencial')
        ? <UIIconButton onClick={() => handleTransition(payload)}>
            <Icon path={(payload === 'less') ? mdiChevronLeft : mdiChevronRight} size={1} title={`Um item imediatamente ${(payload === 'more') ? 'posterior (+1)' : 'anterior (-1)'} `} />
          </UIIconButton>
        : ''
      }
    </>
  );
}

export default SearchNextOrPreview;
