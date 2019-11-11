import { Moment } from "moment";

export class Promo {
    title: string;
    initDate: Moment;
    endDate: Moment;
    _id: String;
    thumbnail: String;
    initPrice: Number;
    endPrice: Number;
    favorito: boolean;
    descont: Number;
    about: String;
}
