import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PermissionService { 
private role: string = '';
    constructor() { 
        this.loadRolesFromToken();
    }

    loadRolesFromToken() {
        const token = localStorage.getItem('authToken');
        if (token) {
          const tokenPayload = this.decodeToken(token);
          this.role = tokenPayload.role;
        }
    }

    decodeToken(token: string): any {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return "1";
        }
    }

    isAdmin(): boolean {
        return this.role.includes('ADMIN');
    }
    
    isUser(): boolean {
        return this.role.includes('USER');
    }


}