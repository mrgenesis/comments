
import { LoaderAction, LoaderState } from '../interfaces';

export default function loaderReducer(state: LoaderState, action: LoaderAction) {
  const resetStatus = {
    message: 'O sistema está trabalhando em sua solicitação.',
    loading: false
  };
  switch(action.type) {
    case 'LOADING':
      return { ...state, loading: true, ...action?.payload };
    case 'DONE':
      return { ...state, ...resetStatus };
    default:
      throw new Error(`action.type "${action.type}" don't exist in loaderReducer.`);      
  }
}