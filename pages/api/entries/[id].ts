import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry
;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ message: 'Not a valid id: ' + id })
    }

    switch (req.method) {
        case 'GET':
            return getEntry(req, res);
        case 'PUT':
            return updateEntry(req, res);
        default:
            return res.status(400).json({ message: 'Not valid endpoint.' })
    }

}

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryInDB = await Entry.findById(id);
    await db.disconnect();

    if ( !entryInDB ) {
        return res.status(400).json({ message: 'No entry with this id: ' + id })
    }
    return res.status(200).json(entryInDB);
    
}

const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id } = req.query;
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    
    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No entry with this id: ' + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
        await db.disconnect();
        return res.status(200).json( updatedEntry! );
    } catch (error) {
        console.log({error});
        return res.status(400).json({ message: 'Bad request.' });
    }
    

}