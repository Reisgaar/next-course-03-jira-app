import React, { useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '@/apis';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

interface Props {
    children: JSX.Element
}

export const EntriesProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = React.useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: 'Entry - Add-Entry', payload: newEntry });
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: 'Entry - Update-Entry', payload: entry });
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: 'Entry - Refresh-Data', payload: data });
    }

    useEffect(() => {
      refreshEntries();
    }, [])
    

    return (
    <EntriesContext.Provider value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
    }}>
        { children }
    </EntriesContext.Provider>
    )
}
