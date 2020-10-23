import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { mergeMap } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class MailingService {
    private readonly _savedKey = 'sended';
    private readonly _draftsKey = 'drafts';

    constructor(private api: ApiService) { }

    send(value): Observable<any> {
        return this.api.get(this._savedKey).pipe(mergeMap(v => {
            v = Array.isArray(v) ? v : [];
            (<Array<any>>v).push(value);

            return this.api.set(this._savedKey, value);
        }));
    }
}