import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {

    const { sideMenuIsOpen, closeSideMenu } = React.useContext( UIContext );

    return (
        <Drawer anchor='left' open={ sideMenuIsOpen } onClose={ closeSideMenu }>

            <Box sx={{ width: 250 }}></Box>

            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant='h4'>Menú</Typography>
            </Box>

            <List>
                {
                    menuItems.map( (text, index) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>{ index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }</ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItem>
                    ))
                }
            </List>

            <Divider></Divider>

            <List>
                {
                    menuItems.map( (text, index) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>{ index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }</ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItem>
                    ))
                }
            </List>
            
        </Drawer>
    )
}
