import { Routes } from '@angular/router';

// Import components ที่จะใช้ใน routing
// หากยังไม่ได้สร้าง ให้ใช้คำสั่ง ng generate component <component-name>
// เช่น ng generate component login --project=production-plan
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent }, // ตัวอย่างหน้าสำหรับหลัง Login

    // กำหนดให้ path ว่าง ('') redirect ไปที่หน้า login โดยอัตโนมัติ
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Optional: สร้างหน้า PageNotFound สำหรับ URL ที่ไม่ถูกต้อง
    // { path: '**', component: PageNotFoundComponent }
];