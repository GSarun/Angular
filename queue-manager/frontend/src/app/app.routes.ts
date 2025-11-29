import { Routes } from '@angular/router';
import { RegistrationComponent } from './features/registration/registration.component';
import { QueueDisplayComponent } from './features/queue-display/queue-display.component';
import { StaffDashboardComponent } from './features/staff-dashboard/staff-dashboard.component';
import { BookingComponent } from './features/booking/booking.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { HistoryComponent } from './features/history/history.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'registration', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
    { path: 'display', component: QueueDisplayComponent, canActivate: [AuthGuard] },
    { path: 'staff', component: StaffDashboardComponent, canActivate: [AuthGuard] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
    { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard] },
];
