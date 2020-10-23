import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ApiService {
    constructor() { }

    get(key: string): Observable<any> {
        if (localStorage.getItem(key)) {
            const value = JSON.parse(localStorage.getItem(key));
            return of(value);
        }
        return of(null);
    }

    set(key, value) {
        const str = JSON.stringify(value);
        localStorage.setItem(key, str);
        return of(true);
    }
}