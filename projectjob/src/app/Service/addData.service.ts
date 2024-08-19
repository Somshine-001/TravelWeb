import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AddDataService {

    private addDataUrl = 'http://localhost:8081/admin';

    constructor(private http: HttpClient) {}
    save<T>(endpoint: string, data: T): Observable<any> {
        return this.http.post(`${this.addDataUrl}/${endpoint}/save`, data);
    }

}