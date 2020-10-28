import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ApiService {
    constructor() { }

    get(key: string): Observable<any> {
        let value = [];
        if (localStorage.getItem(key)) {
            value = JSON.parse(localStorage.getItem(key));
        }
        return of(value);
    }

    set(key, value) {
        const str = JSON.stringify(value);
        localStorage.setItem(key, str);
        return of(str);
    }
}