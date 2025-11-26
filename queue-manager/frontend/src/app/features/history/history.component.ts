import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueueService } from '../../core/services/queue.service';
import { QueueItem } from '../../core/models/queue.model';
import { map } from 'rxjs';

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './history.component.html',
})
export class HistoryComponent {
    searchTerm = '';
    selectedDate = '';
    history: QueueItem[] = [];
    searched = false;

    constructor(private queueService: QueueService) { }

    search() {
        this.searched = true;
        this.queueService.queue$.pipe(
            map(items => items.filter(i => {
                const matchesLicense = i.licensePlate.toLowerCase().includes(this.searchTerm.toLowerCase());

                if (!this.selectedDate) return matchesLicense;

                const itemDate = new Date(i.joinedAt).toISOString().split('T')[0];
                return matchesLicense && itemDate === this.selectedDate;
            }))
        ).subscribe(items => {
            this.history = items;
        });
    }
}
