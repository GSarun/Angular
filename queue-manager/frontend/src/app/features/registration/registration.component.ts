import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueueService } from '../../core/services/queue.service';
import { QueueItem } from '../../core/models/queue.model';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './registration.component.html',
})
export class RegistrationComponent {
    registrationForm: FormGroup;
    submitted = false;
    successMessage: string | null = null;

    constructor(private fb: FormBuilder, private queueService: QueueService) {
        this.registrationForm = this.fb.group({
            licensePlate: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
            licensePlateProvince: ['', Validators.required],
            userDetails: ['', Validators.required],
            lane: ['1', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        this.successMessage = null;

        if (this.registrationForm.valid) {
            const newItem: QueueItem = {
                id: this.generateId(),
                licensePlate: this.registrationForm.value.licensePlate.toUpperCase(),
                licensePlateProvince: this.registrationForm.value.licensePlateProvince,
                userDetails: this.registrationForm.value.userDetails,
                lane: this.registrationForm.value.lane,
                status: 'waiting',
                joinedAt: new Date()
            };

            this.queueService.addQueueItem(newItem);

            // Show success feedback
            this.successMessage = `Vehicle ${newItem.licensePlate} registered successfully!`;

            // Reset form but keep the lane selection
            const currentLane = this.registrationForm.get('lane')?.value;
            this.registrationForm.reset({ lane: currentLane });
            this.submitted = false;

            // Hide success message after 3 seconds
            setTimeout(() => {
                this.successMessage = null;
            }, 3000);
        }
    }

    generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
