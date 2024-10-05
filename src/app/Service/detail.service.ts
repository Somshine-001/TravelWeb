import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DetailService {

    private readonly KEY = 'detail';
    private data: any;

  setData(data: any) {
    localStorage.removeItem(this.KEY);
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

  getData() {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : null;
  }

}