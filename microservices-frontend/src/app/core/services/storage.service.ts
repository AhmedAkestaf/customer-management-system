import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'user_data';
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    setToken(token: string): void {
        if (this.isBrowser) {
            localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    getToken(): string | null {
        if (this.isBrowser) {
            return localStorage.getItem(this.TOKEN_KEY);
        }
        return null;
    }

    removeToken(): void {
        if (this.isBrowser) {
            localStorage.removeItem(this.TOKEN_KEY);
        }
    }

    setUser(user: any): void {
        if (this.isBrowser) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
    }

    getUser(): any {
        if (this.isBrowser) {
            const user = localStorage.getItem(this.USER_KEY);
            return user ? JSON.parse(user) : null;
        }
        return null;
    }

    removeUser(): void {
        if (this.isBrowser) {
            localStorage.removeItem(this.USER_KEY);
        }
    }

    clear(): void {
        if (this.isBrowser) {
            localStorage.clear();
        }
    }
}
