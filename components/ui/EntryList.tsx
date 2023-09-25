import { DragEvent, FC, useContext, useMemo } from 'react';
import { Paper, List } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    // En useMemo se guarda el valor que devuelve la función del primer parámetro, y se actualiza cuando cambia algo de la lista de dependencias
    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status), [ entries ]);

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find( entry => entry._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }

    return (
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 8px' }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={entry._id} entry={ entry }></EntryCard>
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
