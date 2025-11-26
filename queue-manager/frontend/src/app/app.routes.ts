import { Routes } from '@angular/router';
import { RegistrationComponent } from './features/registration/registration.component';
import { QueueDisplayComponent } from './features/queue-display/queue-display.component';
import { StaffDashboardComponent } from './features/staff-dashboard/staff-dashboard.component';
import { BookingComponent } from './features/booking/booking.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { HistoryComponent } from './features/history/history.component';

export const routes: Routes = [
    { path: '', redirectTo: 'registration', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'display', component: QueueDisplayComponent },
    { path: 'staff', component: StaffDashboardComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'history', component: HistoryComponent },
];
