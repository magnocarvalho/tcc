export interface IDefault {
    isDeleted?: boolean;
    createdby?: string;
    createdon?: Date;
    modifiedby?: string;
    modifiedon?: Date;
}
export const Inject = (obj: Object): void => {
    obj["isDeleted"] = { type: Boolean, default: false };
    obj["createdon"] = { type: Date, default: Date.now };
    obj["modifiedon"] = { type: Date, default: Date.now };
    obj["createdby"] = { type: String };
    obj["modifiedby"] = { type: String };
};
