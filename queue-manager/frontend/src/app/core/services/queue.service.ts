import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueueItem } from '../models/queue.model';

@Injectable({
    providedIn: 'root'
})
export class QueueService {
    private apiUrl = 'http://localhost:3000/api/queue';
    private queueSubject = new BehaviorSubject<QueueItem[]>([]);
    public queue$ = this.queueSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadQueue();
    }

    private loadQueue() {
        this.http.get<QueueItem[]>(this.apiUrl).subscribe({
            next: (items) => this.queueSubject.next(items),
            error: (err) => console.error('Failed to load queue', err)
        });
    }

    addQueueItem(item: QueueItem) {
        this.http.post<QueueItem>(this.apiUrl, item).subscribe({
            next: (newItem) => {
                const currentQueue = this.queueSubject.value;
                this.queueSubject.next([...currentQueue, newItem]);
            },
            error: (err) => console.error('Failed to add item', err)
        });
    }

    updateQueueItem(updatedItem: QueueItem) {
        this.http.put<QueueItem>(`${this.apiUrl}/${updatedItem.id}`, updatedItem).subscribe({
            next: () => {
                const currentQueue = this.queueSubject.value;
                const updatedQueue = currentQueue.map(item => item.id === updatedItem.id ? updatedItem : item);
                this.queueSubject.next(updatedQueue);
            },
            error: (err) => console.error('Failed to update item', err)
        });
    }

    getQueueByLane(lane: string): Observable<QueueItem[]> {
        return this.queue$.pipe(
            map(items => items.filter(item => item.lane === lane && item.status !== 'completed' && item.status !== 'cancelled'))
        );
    }

    getActiveItem(lane: string): Observable<QueueItem | undefined> {
        return this.queue$.pipe(
            map(items => items.find(item => item.lane === lane && item.status === 'active'))
        );
    }

    callNext(lane: string) {
        const currentQueue = this.queueSubject.value;

        // Finish current active if any
        const activeItem = currentQueue.find(item => item.lane === lane && item.status === 'active');
        if (activeItem) {
            const updatedActive = { ...activeItem, status: 'completed' as const, completedAt: new Date() };
            this.updateQueueItem(updatedActive);
        }

        // Call next waiting
        const nextItem = currentQueue.find(item => item.lane === lane && item.status === 'waiting');
        if (nextItem) {
            const updatedNext = { ...nextItem, status: 'active' as const, startedAt: new Date() };
            this.updateQueueItem(updatedNext);
        }
    }

    finishCurrent(lane: string) {
        const currentQueue = this.queueSubject.value;
        const activeItem = currentQueue.find(item => item.lane === lane && item.status === 'active');
        if (activeItem) {
            const updatedActive = { ...activeItem, status: 'completed' as const, completedAt: new Date() };
            this.updateQueueItem(updatedActive);
        }
    }
}
