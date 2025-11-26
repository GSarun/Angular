import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../core/models/queue.model';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './booking.component.html',
})
export class BookingComponent {
    bookingForm: FormGroup;
    submitted = false;
    successMessage = '';
    errorMessage = '';

    constructor(private fb: FormBuilder, private bookingService: BookingService) {
        this.bookingForm = this.fb.group({
            date: ['', Validators.required],
            timeSlot: ['', Validators.required],
            lane: ['1', Validators.required],
            licensePlate: ['', Validators.required],
            userDetails: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        this.successMessage = '';
        this.errorMessage = '';

        if (this.bookingForm.valid) {
            const booking: Booking = {
                id: Math.random().toString(36).substr(2, 9),
                ...this.bookingForm.value
            };

            const success = this.bookingService.addBooking(booking);
            if (success) {
                this.successMessage = 'Booking Confirmed!';
                this.bookingForm.reset({ lane: '1' });
                this.submitted = false;
            } else {
                this.errorMessage = 'Slot already taken. Please choose another time.';
            }
        }
    }
}
