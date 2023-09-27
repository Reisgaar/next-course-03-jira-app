import { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '@/interfaces';
import { UIContext } from '@/context/ui';
import { useRouter } from 'next/router';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);
    const router = useRouter();

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id);
        startDragging();
    }

    const onDragEnd = () => {
        endDragging();
    }

    const getTimeAgo = (): string => {
        let diff = Math.ceil((Date.now() - entry.createdAt) / 1000 / 60); // in minutes
        if ( diff < 60 ) { return `${diff} min ago` }
        diff = Math.round(diff / 60); // in hours
        if ( diff < 24 ) { return `${diff} h ago` }
        diff = Math.round(diff / 24); // in days
        if ( diff === 1 ) { return `${diff} day ago` }
        else if ( diff < 15 ) { return `${diff} days ago` }
        const date = new Date(entry.createdAt);
        return date.toDateString().substring(date.toDateString().indexOf(' ') + 1);
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`);
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
            onClick={ onClick }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSpace: 'pre-line'}}>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                    <Typography variant='body2'>{ getTimeAgo() }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
