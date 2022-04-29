
import { IList, IConfigOfButtonNext } from "../../interfaces";
import { ListTypes, IsPhoneNumberId } from "../../types";
import { Generic } from "./Generic";
 import { collectionsNames } from "../../__config";

export class ListsModel implements IList {
  listId: string;
  listType: ListTypes;
  isPhoneNumberId: IsPhoneNumberId;
  beginning: number;
  end: number;
  lastItemUpdated: number;
  configOfButtonNext: IConfigOfButtonNext;
  constructor({ listId, listType, isPhoneNumberId, beginning, end, lastItemUpdated, configOfButtonNext }: IList) {
    this.listId = listId;
    this.listType = listType;
    this.isPhoneNumberId = isPhoneNumberId;
    this.beginning = beginning;
    this.end = end;
    this.lastItemUpdated = lastItemUpdated;
    this.configOfButtonNext = configOfButtonNext;
  }
}


export class ListsCollection extends Generic<ListsModel> {
  constructor() {
    super(collectionsNames.LISTS);
  }
}

