import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';
import { Booking } from '../models/queue.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private readonly STORAGE_KEY = 'bookings';
    private bookingsSubject = new BehaviorSubject<Booking[]>([]);
    public bookings$ = this.bookingsSubject.asObservable();

    constructor(private dataService: DataService) {
        this.loadBookings();
    }

    private loadBookings() {
        const items = this.dataService.getItem<Booking[]>(this.STORAGE_KEY) || [];
        this.bookingsSubject.next(items);
    }

    private saveBookings(items: Booking[]) {
        this.dataService.setItem(this.STORAGE_KEY, items);
        this.bookingsSubject.next(items);
    }

    addBooking(booking: Booking): boolean {
        const currentBookings = this.bookingsSubject.value;
        // Simple slot check
        const isSlotTaken = currentBookings.some(b =>
            b.date === booking.date &&
            b.timeSlot === booking.timeSlot &&
            b.lane === booking.lane
        );

        if (isSlotTaken) {
            return false;
        }

        const updatedBookings = [...currentBookings, booking];
        this.saveBookings(updatedBookings);
        return true;
    }

    getBookingsByDate(date: string): Booking[] {
        return this.bookingsSubject.value.filter(b => b.date === date);
    }
}
