
import { firestore  } from "../../firebase";
import { 
  doc, 
  query, 
  where, 
  getDoc, 
  addDoc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  collection,
  QuerySnapshot, 
  DocumentSnapshot, 
  DocumentReference, 
  CollectionReference,
  Query,
  QueryConstraint,
} from "firebase/firestore";

import { ISetQueryConstraint, setQueryConstraint } from "./set-query";
import { dataTypes } from "../../../commun/utils/types";
import { onDocSnapshot } from "./on-doc-snapshot";
import { onQuerySnapshot } from "./on-query-snapshot copy";

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
    this.setDocRef();
  }
  setDocRef() {
    this._docRef = doc(firestore, this.collName, this._docId);
  }
  get docSnap() {
    return this._docSnap;
  }
  setQueryConstraint({ queryConstraint, fieldPath, directionStr, opStr, value }: ISetQueryConstraint): this {
    this.queryConstraints.push(setQueryConstraint({ queryConstraint, fieldPath, directionStr, opStr, value }));
    this._query = query(this.collectionRef, ...this.queryConstraints);
    return this;
  }
  onDocSnapshot(setResult: (t: T) => void): void {
    onDocSnapshot(this._docRef, setResult);
  }
  
  onQuerySnapshot(setResult: (t: T[]) => void) {
    onQuerySnapshot(this._query, setResult);
  }
  async selectById(docId: string): Promise<this> {
    this.docId = docId;
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
