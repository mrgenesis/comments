import { IList } from "../../interfaces";
interface INexRegister extends IList {
  option: 'less' | 'more';
  clientId_n?: number;
}

export const addOrDecreaseOne: any = ({ beginning, end, lastItemUpdated, name, clientId_n }: INexRegister) =>  {
  const behaviors = {
    less: () => {
      const nextId = clientId_n ? clientId_n - 1 : lastItemUpdated - 1;
      if (nextId < beginning) {
        return end;
      }
      return nextId;
    },
    more: () => {
      const nextId = clientId_n ? clientId_n + 1 : lastItemUpdated + 1;
      if (nextId > end) {
        return beginning;
      }
      return nextId;
    }
  };
  const getRegistry = (behavior: 'less' | 'more'): number => {
    return behaviors[behavior]();
  }
  return getRegistry;
  
}