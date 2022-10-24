import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    removeEmptyProperties<T extends Object>(obj: T): T {
        type Keys = keyof typeof obj;
        Object.keys(obj).forEach(key => {
            const typeKey = key as Keys;
            if(!obj[typeKey] && obj[typeKey] !== 0){
                delete obj[typeKey];
            }
        })
        return obj;
    }
}