
export type IComment = {
  date: string;
  status: string;
  message: string;
  lastStatus?: string;
} | undefined;

export type IHistoryStatus = 
'' 
| 'Caixa Postal' 
| 'Número não existe' 
| 'Desligou inesperadamente' 
| 'Ninguém atende' 
| 'Ligação efetuada' 
| 'Reação positiva' 
| 'Não domostrou reação' 
| 'Revisita';
