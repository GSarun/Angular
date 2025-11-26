import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../core/services/queue.service';
import { QueueItem } from '../../core/models/queue.model';
import { Observable, take } from 'rxjs';

@Component({
    selector: 'app-staff-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './staff-dashboard.component.html',
})
export class StaffDashboardComponent implements OnInit {
    lanes = ['1', '2', '3'];
    queues: { [lane: string]: Observable<QueueItem[]> } = {};
    activeItems: { [lane: string]: Observable<QueueItem | undefined> } = {};

    constructor(private queueService: QueueService) { }

    ngOnInit() {
        this.lanes.forEach(lane => {
            this.queues[lane] = this.queueService.getQueueByLane(lane);
            this.activeItems[lane] = this.queueService.getActiveItem(lane);
        });
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
        window.speechSynthesis.speak(utterance);
    }
}
