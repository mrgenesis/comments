
import { IComment } from "../../interfaces";
import { IHistoryStatus } from "../../types";
import { Generic } from "./Generic";

import { collectionsNames } from "../../__config";

export class Comment implements IComment {
  message?: string | undefined;
  timestamp: number;
  status: IHistoryStatus;
  constructor({ status, message }: { status: IHistoryStatus, message: string }) {
    this.message = message;
    this.status = status;
    this.timestamp = Date.now();
  }
  get data(): Comment {
    return { ...this };
  }

}

export class CommentCollection extends Generic<Comment> {
  constructor(docId: string | number) {
    super(`${collectionsNames.RECORDS}/${docId}/comments`);
  }
}
