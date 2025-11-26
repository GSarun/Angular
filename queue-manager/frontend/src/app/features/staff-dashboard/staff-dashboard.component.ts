import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../core/services/queue.service';
import { QueueItem } from '../../core/models/queue.model';
import { Observable, take } from 'rxjs';
import { SettingsDialogComponent } from '../settings/settings-dialog.component';

@Component({
    selector: 'app-staff-dashboard',
    standalone: true,
    imports: [CommonModule, SettingsDialogComponent],
    templateUrl: './staff-dashboard.component.html',
})
export class StaffDashboardComponent implements OnInit {
    lanes = ['1', '2', '3'];
    queues: { [lane: string]: Observable<QueueItem[]> } = {};
    activeItems: { [lane: string]: Observable<QueueItem | undefined> } = {};

    speechRate: number = 1.0;
    showSettings: boolean = false;

    constructor(private queueService: QueueService) { }

    ngOnInit() {
        this.loadSettings();
        this.lanes.forEach(lane => {
            this.queues[lane] = this.queueService.getQueueByLane(lane);
            this.activeItems[lane] = this.queueService.getActiveItem(lane);
        });
    }

    loadSettings() {
        const savedRate = localStorage.getItem('speechRate');
        if (savedRate) {
            this.speechRate = parseFloat(savedRate);
        }
    }

    saveSettings(rate: number) {
        this.speechRate = rate;
        localStorage.setItem('speechRate', rate.toString());
        this.showSettings = false;
    }

    openSettings() {
        this.showSettings = true;
    }

    closeSettings() {
        this.showSettings = false;
    }

    callNext(lane: string) {
        this.queues[lane].pipe(take(1)).subscribe(items => {
            const nextItem = items.find(item => item.status === 'waiting');
            if (nextItem) {
                this.speakLicensePlate(nextItem.licensePlate);
            }
            this.queueService.callNext(lane);
        });
    }

    finishCurrent(lane: string) {
        this.queueService.finishCurrent(lane);
    }

    speakLicensePlate(licensePlate: string) {
        // Split the license plate into individual characters and join with space
        // This forces the TTS engine to read it character by character
        const spokenText = licensePlate.split('').join(' ');
        const utterance = new SpeechSynthesisUtterance(spokenText);
        utterance.lang = 'th-TH';
        utterance.rate = this.speechRate;
        window.speechSynthesis.speak(utterance);
    }
}
