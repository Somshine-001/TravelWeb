import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PermissionService { 
    private role: string = '';
    private username: string = '';
    constructor() { 
        this.loadRolesFromToken();
        this.loadNameFromToken();
    }

    loadRolesFromToken() {
        const token = localStorage.getItem('authToken');
        if (token) {
          const tokenPayload = this.decodeToken(token);
          this.role = tokenPayload.role;
        }
    }
    loadNameFromToken() {
        const token = localStorage.getItem('authToken');
        if (token) {
            const tokenPayload = this.decodeToken(token);
            this.username = tokenPayload.sub;
        }
    }

    decodeToken(token: string): any {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return "1";
        }
    }

    getName(): string {
        const maxLength = 10;
        if (this.username.length > maxLength) {
            return this.username.substring(0, maxLength) + '...';
        }
        return this.username;
    }

    isAdmin(): boolean {
        return this.role.includes('ADMIN');
    }
    
    isUser(): boolean {
        return this.role.includes('USER');
    }

}