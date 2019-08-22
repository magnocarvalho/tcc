export interface IDefault {
    isDeleted?: boolean;
    createdby?: string;
    createdon?: Date;
    modifiedby?: string;
    modifiedon?: Date;
}
export const Inject = (obj: any): void => {
    obj["isDeleted"] = { type: Boolean, default: false };
    obj["createdon"] = { type: Date, default: Date.now };
};
