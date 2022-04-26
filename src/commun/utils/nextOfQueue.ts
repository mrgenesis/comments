import { NoticeAction } from "../../interfaces";
import { dataTypes } from "./types"; 

export const nextOfQueue = (option: 'less' | 'more', clientId: string, dispatchNoiceBoard: React.Dispatch<NoticeAction>) => {
  let arrOfIds: any = localStorage.getItem('ids');
  try {
    arrOfIds = JSON.parse(arrOfIds as string);
    if (dataTypes.isNull(arrOfIds)) {
      const message = 'A lista de itens não foi carregada. Selecione um status para carregá-la.';
      dispatchNoiceBoard({ type: 'ERROR', payload: { hiddenStatus: false, message } });
      throw new Error(message);
    }
  } catch(err: any) {
    console.error(err);
    return clientId;
  }
  const len = arrOfIds.length;
  const lastIndexAvaliable = len - 1;
  let currentIndex = arrOfIds.indexOf(clientId);
  if (len === 1 || len === 0) {
    dispatchNoiceBoard({ type: 'GENERIC', payload: { hiddenStatus: false, message: `${len ? 'Há apenas um' : 'Não foi localizado nenhum'} registro disponível. O item ${(option === 'more') ? '"próximo"' : '"anterior"'} não existe.` } });
    return clientId;
  }
  const moreOrLessOption = {
    less: () => {
      currentIndex--;
      return (currentIndex === -1) ? arrOfIds[lastIndexAvaliable] : arrOfIds[currentIndex];
    },
    more: () => {
      currentIndex++;
      return (dataTypes.isUndefined(arrOfIds[currentIndex])) ? arrOfIds[0] : arrOfIds[currentIndex];
    }
  }
  return moreOrLessOption[option]();
}