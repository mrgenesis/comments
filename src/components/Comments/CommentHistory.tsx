
import { uid } from "../../commun/utils";
import UIPaper from "../UI/dataDisplay/Paper";
import { DocumentData } from "firebase/firestore";
import UITypography from "../UI/dataDisplay/Typography";

const CommentsHistory = ({ history }: DocumentData) => (
  history.map((dataComment: DocumentData) => (
      <UIPaper elevation={1} key={uid()} sx={{ width: '100%' }}>
        <UITypography 
          variant="subtitle2"
        >
          {dataComment.message}
        </UITypography>
        <UITypography 
          variant="caption" 
          color='#7f7f7f'
        >
          {new Date(dataComment.timestamp).toLocaleString()} - {dataComment.status}
        </UITypography>
         
      </UIPaper>
    )
  ))


export default CommentsHistory;
