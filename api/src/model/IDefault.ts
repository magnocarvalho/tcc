import * as mongoose from "mongoose";

export interface IDefault {
  isDeleted?: boolean;
  createdby?: String;
  createdon?: Date;
  modifiedby?: String;
  modifiedon?: Date;
}
export const Inject = (obj: any): void => {
  obj["isDeleted"] = { type: Boolean, default: false };
  obj["createdon"] = { type: Date, default: Date.now };
  obj["modifiedon"] = { type: Date, default: Date.now() };
  obj["createdby"] = { type: mongoose.Schema.Types.ObjectId, ref: "User" };
};
