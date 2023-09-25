import { db, seedData } from '@/database';
import { Entry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({message: 'You don\'t have access to thos service!'})
    }

    await db.connect();
    await Entry.deleteMany(); // Be careful, deleteMany will erase everything on the DB, here it's used only for development
    await Entry.insertMany(seedData.entries)
    await db.disconnect();

    res.status(200).json({ message: 'Process successfully done' });
}
