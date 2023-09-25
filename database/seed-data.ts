interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string; // pending, in-progress, finished
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: Aut est et. Provident quo quo sit voluptas asperiores necessitatibus. Et ex qui odit id aut. Ut sint illo fugiat eveniet et sit eius et ut.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'In-progress: Facere nostrum in atque qui et provident delectus voluptatem. Et totam porro quidem est neque consequatur aut. Porro quos esse nobis eius commodi alias repellat animi fuga.',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            description: 'Finished: Voluptatem voluptas molestiae voluptas cum reprehenderit ex et. Voluptas molestiae temporibus. Culpa similique itaque.',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        },
    ]
}