export interface QueueItem {
    id: string;
    licensePlate: string;
    userDetails: string;
    lane: string;
    status: 'waiting' | 'active' | 'completed' | 'cancelled';
    joinedAt: Date;
    startedAt?: Date;
    completedAt?: Date;
    estimatedWaitTime?: number; // in minutes
}

export interface Booking {
    id: string;
    date: string; // YYYY-MM-DD
    timeSlot: string; // HH:mm
    lane: string;
    licensePlate: string;
    userDetails: string;
}

export interface LaneStats {
    lane: string;
    totalServed: number;
    avgWaitTime: number;
    utilization: number;
}
