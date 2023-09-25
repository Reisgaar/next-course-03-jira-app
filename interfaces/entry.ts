
export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus; // pending, in-progress, finished
}

// Mejor usar type cuando no se va a expandir o no van a crecer
export type EntryStatus = 'pending' | 'in-progress' | 'finished';