import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    /**
     * ฟังก์ชันตรวจสอบสิทธิ์ก่อนเข้าหน้าเว็บ
     * ถ้าล็อกอินแล้ว -> ให้ผ่าน (return true)
     * ถ้ายังไม่ล็อกอิน -> พาไปหน้า Login
     */
    canActivate(): boolean | UrlTree {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            // พาไปหน้า Login ถ้ายังไม่ได้ล็อกอิน
            return this.router.createUrlTree(['/login']);
        }
    }
}
