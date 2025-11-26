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

    constructor(private fb: FormBuilder, private queueService: QueueService) {
        this.registrationForm = this.fb.group({
            licensePlate: ['', Validators.required],
            userDetails: ['', Validators.required],
            lane: ['1', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.registrationForm.valid) {
            const newItem: QueueItem = {
                id: this.generateId(),
                licensePlate: this.registrationForm.value.licensePlate,
                userDetails: this.registrationForm.value.userDetails,
                lane: this.registrationForm.value.lane,
                status: 'waiting',
                joinedAt: new Date()
            };
            this.queueService.addQueueItem(newItem);
            this.registrationForm.reset({ lane: '1' });
            this.submitted = false;
            alert('Registration Successful!');
        }
    }

    generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
