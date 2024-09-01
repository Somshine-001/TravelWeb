import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class EditDataService {

    private editDataUrl = 'http://localhost:8081/admin';

    constructor(private http: HttpClient) {}

    getAll<T>(endpoint: string): Observable<T[]> {
        return this.http.get<T[]>(`${this.editDataUrl}/${endpoint}`);
    }

    update<T>(endpoint: string, data: T): Observable<any> {
        return this.http.put(`${this.editDataUrl}/${endpoint}/update`, data);
    }

    delete(endpoint: string, id: number): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/${endpoint}/delete/${id}`);
    }

}

//interface
export interface Role {
    id: number;
    name: string;
}
export interface Tag {
    id: number;
    name: string;
}

export interface Community {
    id: number;
    name: string;
    detail: string;
    tel: string;
    date: string;
    username: string;
}

export interface Place {
    id: number;
    name: string;
    detail: string;
    gps: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
}

export interface FoodsProducts {
    id: number;
    name: string;
    detail: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
}

export interface Plan {
    id: number;
    name: string;
    detail: string;
    date: string;
    communityName: string;
    username: string;
}

export interface Event {
    id: number;
    name: string;
    detail: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
}

export interface News {
    id: number;
    name: string;
    detail: string;
    date: string;
    communityName: string;
    username: string;
}