

import { 
  where, 
  orderBy,
  FieldPath,
  QueryConstraint,
  OrderByDirection,
  QueryConstraintType,
  WhereFilterOp,
} from "firebase/firestore";

export interface ISetQueryConstraint {
  queryConstraint: QueryConstraintType
  value?: any, 
  opStr?: WhereFilterOp, 
  fieldPath?: string | FieldPath, 
  directionStr?: OrderByDirection, 
}

export function  setQueryConstraint({ queryConstraint, fieldPath, directionStr, opStr, value }: ISetQueryConstraint): QueryConstraint {
  switch(queryConstraint) {
    case 'orderBy':
      return orderBy(fieldPath as string | FieldPath, directionStr);
    case 'where':
      return where(fieldPath as string | FieldPath, opStr as WhereFilterOp, value);
    default:
      throw new Error(`The queryConstraint "${queryConstraint}" don't exists.`);
  }
}
