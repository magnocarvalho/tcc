import { Injectable } from '@angular/core';
import { Promo } from '../model/promo';

@Injectable()
export class PromoData {

    public storage: Promo;

    public constructor() { }

    setPromo(obj: Promo) {
        this.storage = obj;
    }

}
