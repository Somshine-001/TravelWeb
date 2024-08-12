import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class EditDataService {

    private editDataUrl = 'http://localhost:8081/admin';

    constructor(private http: HttpClient) {}

    getAllTag(): Observable<any> {
        return this.http.get<Tag[]>(`${this.editDataUrl}/tag`);
    }
    updateTag(updateTag: {tagId: number, tagName: string}): Observable<any> {
        return this.http.put(`${this.editDataUrl}/tag/update`, updateTag);
    }
    deleteTag(deleteTag: {tagId: number}): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/tag/delete/${deleteTag.tagId}`);
    }

    getAllCommu(): Observable<any> {
        return this.http.get<Community[]>(`${this.editDataUrl}/communities`);
    }
    updateCommu(updateCommu: {communityId: number, communityName: string, communityTitle: string, tel: string}): Observable<any> {
        return this.http.put(`${this.editDataUrl}/communities/update`, updateCommu);
    }
    deleteCommu(deleteCommu: {communityId: number}): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/communities/delete/${deleteCommu.communityId}`);
    }

    getAllPlace(): Observable<any> {
        return this.http.get<Place[]>(`${this.editDataUrl}/places`);
    }
    updatePlace(updatePlace: {placeId: number, placeName: string, placeTitle: string, placeGps: string, communityName: string, tagName: string}): Observable<any> {
        return this.http.put(`${this.editDataUrl}/places/update`, updatePlace);
    }
    deletePlace(deletePlace: {placeId: number}): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/places/delete/${deletePlace.placeId}`);
    }

    getAllFp(): Observable<any> {
        return this.http.get<FoodsProducts[]>(`${this.editDataUrl}/fp`);
    }
    updateFp(updateFp: {fpId: number, fpName: string, fpDetail: string, communityName: string, tagName: string}): Observable<any> {
        return this.http.put(`${this.editDataUrl}/fp/update`, updateFp);
    }
    deleteFp(deleteFp: {fpId: number}): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/fp/delete/${deleteFp.fpId}`);
    }

    getAllPlan(): Observable<any> {
        return this.http.get<Plan[]>(`${this.editDataUrl}/plans`);
    }
    updatePlan(updatePlan: {planId: number, planName: string, planDetail: string, communityName: string}): Observable<any> {
        return this.http.put(`${this.editDataUrl}/plans/update`, updatePlan);
    }
    deletePlan(deletePlan: {planId: number}): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/plans/delete/${deletePlan.planId}`);
    }

    getAllEvent(): Observable<any> {
        return this.http.get<Event[]>(`${this.editDataUrl}/events`);
    }
    updateEvent(updateEvent: {eventId: number, eventName: string, eventDetail: string, communityName: string, tagName: string}): Observable<any> {
        return this.http.put(`${this.editDataUrl}/events/update`, updateEvent);
    }
    deleteEvent(deleteEvent: {eventId: number}): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/events/delete/${deleteEvent.eventId}`);
    }

    getAllNews(): Observable<any> {
        return this.http.get<News[]>(`${this.editDataUrl}/news`);
    }
    updateNews(updateNews: {newsId: number, newsName: string, newsDetail: string, communityName: string}): Observable<any> {
        return this.http.put(`${this.editDataUrl}/news/update`, updateNews);
    }
    deleteNews(deleteNews: {newsId: number}): Observable<any> {
        return this.http.delete(`${this.editDataUrl}/news/delete/${deleteNews.newsId}`);
    }
}

//interface
export interface Tag {
    tagId: number;
    tagName: string;
}

export interface Community {
    communityId: number;
    communityName: string;
    communityTitle: string;
    tel: string;
    date: string;
    username: string;
}

export interface Place {
    placeId: number;
    placeName: string;
    placeTitle: string;
    placeGps: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
}

export interface FoodsProducts {
    fpId: number;
    fpName: string;
    fpDetail: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
}

export interface Plan {
    planId: number;
    planName: string;
    planDetail: string;
    date: string;
    communityName: string;
    username: string;
}

export interface Event {
    eventId: number;
    eventName: string;
    eventDetail: string;
    date: string;
    communityName: string;
    tagName: string;
    username: string;
}

export interface News {
    newsId: number;
    newsName: string;
    newsDetail: string;
    date: string;
    communityName: string;
    username: string;
}