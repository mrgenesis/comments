import { IHistoryStatus } from "../../types";
import { Generic } from "./Generic";

export class RegistryModel {
  lastStatus?: IHistoryStatus;
  name?: string;
}

export class Registry extends Generic<RegistryModel> {
  async addListIdProperty(listId: string): Promise<void> {
    if(this._docSnap.exists()) {
      return;
    }
    return this.update({
      _config: {
        listId
      }
    });
  }
}
