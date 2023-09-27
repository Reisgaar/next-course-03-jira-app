import React, { useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';
import { NewEntry } from '../../components/ui/NewEntry';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

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
    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();

    const addNewEntry = async ( description: string ) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: 'Entry - Add-Entry', payload: data });
    }

    const updateEntry = async(entry: Entry, showSnackbar: boolean = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status });
            dispatch({ type: 'Entry - Update-Entry', payload: data });

            if (showSnackbar) {
                router.push('/');
                enqueueSnackbar('Entry updated!', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log({error});
        }
    }
    
    const deleteEntry = async(entry: Entry) => {

        try {
            const { data } = await entriesApi.patch<Entry>(`/entries/${entry._id}`, { id: entry._id });
            dispatch({ type: 'Entry - Delete-Entry', payload: data });
            router.push('/');
            enqueueSnackbar('Entry deleted!', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        } catch (error) {
            console.log({error});
        }

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
        deleteEntry,
    }}>
        { children }
    </EntriesContext.Provider>
    )
}
