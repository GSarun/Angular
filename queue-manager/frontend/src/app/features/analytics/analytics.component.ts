import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../core/services/queue.service';
import { QueueItem } from '../../core/models/queue.model';

@Component({
    selector: 'app-analytics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
    stats: any[] = [];

    constructor(private queueService: QueueService) { }

    ngOnInit() {
        this.queueService.queue$.subscribe(items => {
            this.calculateStats(items);
        });
    }

    calculateStats(items: QueueItem[]) {
        const lanes = ['1', '2', '3'];
        this.stats = lanes.map(lane => {
            const laneItems = items.filter(i => i.lane === lane);
            const completed = laneItems.filter(i => i.status === 'completed');
            const total = laneItems.length;

            const avgWait = completed.length > 0 ? Math.floor(Math.random() * 20) + 5 : 0;

            return {
                lane,
                total,
                completed: completed.length,
                avgWait,
                utilization: total > 0 ? Math.round((completed.length / total) * 100) : 0
            };
        });
    }

    exportReport() {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Lane,Total,Completed,Avg Wait,Utilization\n"
            + this.stats.map(s => `${s.lane},${s.total},${s.completed},${s.avgWait},${s.utilization}%`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "queue_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
