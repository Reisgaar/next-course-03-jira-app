import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
    | { type: 'Entry - Add-Entry', payload: Entry }
    | { type: 'Entry - Update-Entry', payload: Entry }
    | { type: 'Entry - Refresh-Data', payload: Entry[] }
    | { type: 'Entry - Delete-Entry', payload: Entry }
    
// Recibe un estado y produce un nuevo estado
// No es bueno que llame logs
// Debe resolver todo sin salir de la función
// No puede ser asíncrono
export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch (action.type) {
        case 'Entry - Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payload ]
            }
        case 'Entry - Update-Entry':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        case 'Entry - Refresh-Data':
            return {
                ...state,
                entries: [...action.payload]
            }
        case 'Entry - Delete-Entry':
            return {
                ...state,
                entries: state.entries.filter( entry => entry._id !== action.payload._id )
            }
        default:
            return state;
    }
    
}
