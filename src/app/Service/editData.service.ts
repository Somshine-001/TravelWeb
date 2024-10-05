import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class EditDataService {

    private editDataUrl = 'http://localhost:8081/admin';
    private getDataUrl = 'http://localhost:8081/unAuth';
    

    constructor(private http: HttpClient) {}

    getOne<T>(endpoint: string, id: number): Observable<T> {
        return this.http.get<T>(`${this.getDataUrl}/${endpoint}/${id}`);
    }
    getAll<T>(endpoint: string): Observable<T[]> {
        return this.http.get<T[]>(`${this.getDataUrl}/${endpoint}`);
    }

    getData<T>(endpoint: string): Observable<T[]> {
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
export interface User {
    username: string;
    email: string;
    roleName: string;
}
export interface Role {
    id: number;
    name: string;
}
export interface Tag {
    id: number;
    name: string;
}

export interface Province {
    id: number;
    name: string;
}

export interface Image {
    id: number;
    imageData: string;
    imageType: string;
    date: string;
  }

export interface Community {
    id: number;
    name: string;
    address: string;
    history: string;
    detail: string;
    culture: string;
    tel: string;
    date: string;
    upToDate: string;
    username: string;
    provinceName: string;
    publish: boolean;
}

export interface Place {
    id: number;
    name: string;
    detail: string;
    latitude: string;
    longitude: string;
    date: string;
    upToDate: string;
    days: string;
    time: string;
    communityName: string;
    tagName: string;
    username: string;
    publish: boolean;
}

export interface FoodsProducts {
    id: number;
    name: string;
    ingredient: string;
    step: string;
    price: number;
    detail: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
    publish: boolean;
}

export interface Trip {
    id: number;
    name: string;
    detail: string;
    date: string;
    upToDate: string;
    communityName: string;
    username: string;
    publish: boolean;
}

export interface Plan {
    id: number;
    name: string;
    planDetail: PlanDetail[];
    tripId: number;
}

export interface PlanDetail {
    time: string;
    describe: string;
}

export interface Event {
    id: number;
    name: string;
    detail: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
    publish: boolean;
}

export interface News {
    id: number;
    name: string;
    detail: string;
    date: string;
    communityName: string;
    username: string;
    publish: boolean;
}