import {  
  onSnapshot,
  Query
} from "firebase/firestore";

export function onQuerySnapshot(query: Query, setResult: (t: any) => void): void {
  let result: any = [];
  onSnapshot(query, { includeMetadataChanges: true }, snap => {
    result = [];
    if (snap.metadata.hasPendingWrites || snap.empty) {
      return;
    }
    snap.docs.forEach(doc => result.push(doc.data()));
    setResult(result);
  });
}