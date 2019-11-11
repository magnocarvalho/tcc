import { Moment } from "moment";

export class Promo {
    title: string;
    initDate: Moment;
    endDate: Moment;
    _id: String;
    thumbnail: String;
    initPrice: Number;
    endPrice: Number;
    descont: Number;
    about: String;
}
