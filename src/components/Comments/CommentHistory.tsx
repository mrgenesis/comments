
import { uid } from "../../commun/utils";
import UIPaper from "../UI/dataDisplay/Paper";
import UITypography from "../UI/dataDisplay/Typography";
import { Comment, CommentCollection } from "../../services/db/Comment";
import { useState, memo } from "react";


const CommentsHistory = ({ docId, loadId }: { docId: string, loadId: boolean }) => {  
  const [history, setHistory] = useState<Comment[]>([]);
  
  const commentCollection = new CommentCollection(docId);
  commentCollection.setQueryConstraint({ fieldPath: 'timestamp', queryConstraint: "orderBy", directionStr: "desc" });
  
  if (loadId) {
    commentCollection.selectAllDocs().then(coll => {
      setHistory(coll.docsData());
      commentCollection.onQuerySnapshot(setHistory);
    });
  }

  return (
    <>
      {
        (history.length)
        ? history.map((dataComment: Comment) => (
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
          ))
        : <UIPaper elevation={1} key={uid()} sx={{ width: '100%' }}><UITypography variant="caption" color='#7f7f7f'>Nenhum registro encontrado</UITypography></UIPaper>
      }
    </>
  )
  
}

export default memo(CommentsHistory);
