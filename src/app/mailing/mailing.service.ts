import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { mergeMap } from 'rxjs/internal/operators';

const enum EType {
    send,
    save
}

@Injectable({
    providedIn: 'root'
})
export class MailingService {
    private readonly _sendedKey = 'sended';
    private readonly _savedKey = 'saved';

    constructor(private api: ApiService) { }

    private _make(value, type: EType): Observable<any> {
        const key = type === EType.send ? this._sendedKey : this._savedKey;
        return this.api.get(key).pipe(mergeMap(v => {
            v = Array.isArray(v) ? v : [];
            (<Array<any>>v).push(value);

            return this.api.set(key, v);
        }));
    }

    send(value): Observable<any> {
        return this._make(value, EType.send);
    }

    save(value): Observable<any> {
        return this._make(value, EType.save);
    }

    private _get(type: EType, index?: number): Observable<any> {
        const key = type === EType.send ? this._sendedKey : this._savedKey;
        return this.api.get(key).pipe(mergeMap(v => {
            let value = null;
            if (index !== undefined) {
                value = Array.isArray(v) ? (v[index] || {}) : {};
            } else {
                value = Array.isArray(v) ? v : [];
            }
            return of(value);
        }));
    }

    getSended(index?: number) {
        return this._get(EType.send, index);
    }

    getSaved(index?: number) {
        return this._get(EType.save, index);
    }

    private _delete(type: EType, index?: number): Observable<any> {
        const key = type === EType.send ? this._sendedKey : this._savedKey;
        return this.api.get(key).pipe(mergeMap(v => {
            let value = null;
            if (index !== undefined) {
                value = Array.isArray(v) ? (v[index] && v.splice(index, 1)) : [];
                this.api.set(key, v);
            } else {
                value = Array.isArray(v) ? v : [];
                this.api.set(key, []);
            }
            return of(value);
        }));
    }

    deleteSaved(index?: number) {
        return this._delete(EType.save, index);
    }
}