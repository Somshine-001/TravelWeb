import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AddDataService {

    private addDataUrl = 'http://localhost:8081/admin';

    constructor(private http: HttpClient) {}

    saveCommu(commu: {communityName: string, communityTitle: string, tel: string}): Observable<any> {
        return this.http.post(`${this.addDataUrl}/communities/save`, commu);
    }

    savePlace(place: {placeName: string, placeTitle: string, tel: string, placeGps: String, communityName: String, tagName: String}): Observable<any> {
        return this.http.post(`${this.addDataUrl}/places/save`, place);
    }

    saveFp(fp: {fpName: string, fpDetail: string, communityName: String, tagName: String}): Observable<any> {
        return this.http.post(`${this.addDataUrl}/fp/save`, fp);
    }

    savePlan(plan: {planName: string, planDetail: string, communityName: String}): Observable<any> {
        return this.http.post(`${this.addDataUrl}/plans/save`, plan);
    }

    saveEvent(event: {eventName: string, eventDetail: string, communityName: String, tagName: String}): Observable<any> {
        return this.http.post(`${this.addDataUrl}/event/save`, event);
    }

    saveNews(news: {newsName: string, newsDetail: string, communityName: String}): Observable<any> {
        return this.http.post(`${this.addDataUrl}/news/save`, news);
    }

}