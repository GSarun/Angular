import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../core/services/queue.service';
import { QueueItem } from '../../core/models/queue.model';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-queue-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './queue-display.component.html',
})
export class QueueDisplayComponent implements OnInit {
    lanes = ['1', '2', '3'];
    activeItems: { [lane: string]: Observable<QueueItem | undefined> } = {};
    waitingCounts: { [lane: string]: Observable<number> } = {};
    estimatedWaitTimes: { [lane: string]: Observable<number> } = {};

    constructor(private queueService: QueueService) { }

    ngOnInit() {
        this.lanes.forEach(lane => {
            this.activeItems[lane] = this.queueService.getActiveItem(lane);
            const queue$ = this.queueService.getQueueByLane(lane);
            this.waitingCounts[lane] = queue$.pipe(map(items => items.length));
            this.estimatedWaitTimes[lane] = queue$.pipe(map(items => items.length * 15));
        });
    }
}
