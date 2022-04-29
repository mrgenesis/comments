import { IList } from "../../interfaces";

export function generateContactLink(list: IList, nextItem: string): string {
  return `/comments/${nextItem}?listId=${list.listId}&listType=${list.listType}&beginning=${list.beginning}&end=${list.end}&isPhoneNumberId=${list.isPhoneNumberId}`;
}
