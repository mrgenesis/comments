import {  
  onSnapshot,
  DocumentReference
} from "firebase/firestore";

export function onDocSnapshot(docRef: DocumentReference, setResult: (t: any) => void): void {
  onSnapshot(docRef, { includeMetadataChanges: true }, snapDoc => {
    if (snapDoc.exists() && !snapDoc.metadata.hasPendingWrites) {
      setResult(snapDoc.data());
    }
  });
}