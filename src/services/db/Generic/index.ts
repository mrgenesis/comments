
import { firestore  } from "../../firebase";
import { 
  doc, 
  query, 
  where, 
  getDoc, 
  addDoc, 
  setDoc, 
  orderBy,
  getDocs, 
  updateDoc, 
  onSnapshot,
  collection,
  QuerySnapshot, 
  DocumentSnapshot, 
  DocumentReference, 
  CollectionReference,
  Query,
  FieldPath,
  OrderByDirection,
  QueryConstraintType,
  WhereFilterOp,
  QueryConstraint,
} from "firebase/firestore";

import { dataTypes } from "../../../commun/utils/types";

export class Generic<T> {  
  protected readonly collectionRef: CollectionReference;
  protected _querySnapshot!: QuerySnapshot;
  protected _docId!: string;
  protected _docRef!: DocumentReference;
  protected _docSnap!: DocumentSnapshot;
  protected _query!: Query;
  protected queryConstraints: QueryConstraint[] = [];

  constructor(private readonly collName: string) {
    this.collectionRef = collection(firestore, this.collName);
    this._query = this.collectionRef;
  }
  set docId(docId: string) {
    this._docId = docId;
    this._docRef = doc(firestore, this.collName, docId);
  }
  get docSnap() {
    return this._docSnap;
  }
  setQuery({ queryConstraint, fieldPath, directionStr, opStr, value }: { value?: any, opStr?: WhereFilterOp, fieldPath?: string | FieldPath, directionStr?: OrderByDirection, queryConstraint: QueryConstraintType }): this {
    switch(queryConstraint) {
      case 'orderBy':
        this.queryConstraints.push(orderBy(fieldPath as string | FieldPath, directionStr));
        break;
      case 'where':
        this.queryConstraints.push(where(fieldPath as string | FieldPath, opStr as WhereFilterOp, value));
        break;
    }
    this._query = query(this.collectionRef, ...this.queryConstraints);
    return this;
  }
  onSnapshotDoc(setResult: (t: T) => void): void {
    onSnapshot(this._docRef, { includeMetadataChanges: true }, snapDoc => {
      if (snapDoc.exists() && !snapDoc.metadata.hasPendingWrites) {
        setResult(snapDoc.data() as T);
      }
    });
  }
  
  onSnapshotQuery(setResult: (t: T[]) => void) {
    let result: T[] = [];
    onSnapshot(this._query, { includeMetadataChanges: true }, snap => {
      result = [];
      if (!snap.metadata.hasPendingWrites) {
        snap.docs.forEach(doc => result.push(doc.data() as T));
        setResult(result);
      }
    });
  }
  async selectById(docId: string): Promise<this> {
    this._docId = docId;
    this._docRef = doc(firestore, this.collName, docId);
    this._docSnap = await getDoc(this._docRef);
    return this;
  }
  async create(data: T, id?: string): Promise<void> {
    if (dataTypes.isString(id)) {
      await this.selectById(id as string);
      if (this._docSnap.exists()) {
        throw new Error(`Não é possível criar um registro com um nome que já existe. Escolha um nome diferente de '${id}'`);
      }
      await setDoc(this._docRef, data);
      return;
    }
    await addDoc(collection(firestore, this.collName), data);
    return;
  }
  async selectByDocField(fieldName: string, criteries: string[]): Promise<this> {
    const q = query(this.collectionRef, where(fieldName, 'in', criteries));
    this._querySnapshot = await getDocs(q);
    return this;
  }
  async selectAllDocs(): Promise<this> {
    this._querySnapshot = await getDocs(this.collectionRef);
    return this;
  }
  docsData(): T[] {
    const result: T[] = [];
    if(this._querySnapshot.empty) {
      return result;
    }
    this._querySnapshot.docs.forEach(doc => {
      result.push(doc.data() as T);
    });
    return result;
  }
  docsIds() {
    const result: string[] = [];
    if(this._querySnapshot.empty) {
      return result;
    }
    this._querySnapshot.docs.forEach(doc => result.push(doc.id));
    return result;
  }
  async createEmptyDoc(): Promise<this> {
    if (dataTypes.isUndefined(this._docSnap)) {
      throw new Error('Run this.getDoc() first.');
    }
    if(dataTypes.invert(this._docSnap.exists())) {
      await setDoc(this._docRef as DocumentReference, {});
    }
    return this;
  }
  async update(data: any) {
    await this.createEmptyDoc();
    await updateDoc(this._docRef as DocumentReference, data);
  }
}
