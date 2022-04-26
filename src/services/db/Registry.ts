import { IHistoryStatus } from "../../types";
import { Generic } from "./Generic";

export class RegistryModel {
  lastStatus?: IHistoryStatus;
  name?: string;
}

export class Registry extends Generic<RegistryModel> {}
