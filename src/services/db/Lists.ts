
import { IList } from "../../interfaces";
import { IHistoryStatus } from "../../types";
import { Generic } from "./Generic";
 import { collectionsNames } from "../../__config";

export class ListsModel implements IList {
  name: string;
  beginning: number;
  end: number;
  lastItemUpdated: number;
  configOfButtonNext: {
    behavior: string;
    status: IHistoryStatus;
  };
  constructor({ name, beginning, end, lastItemUpdated, configOfButtonNext }: IList) {
    this.name = name;
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

