import React from 'react';
import { Box } from "@mui/material";
import Head from "next/head";
import { Navbar, Sidebar } from '../ui';

interface Props {
    title?: string;
    children: JSX.Element
}

export const Layout: React.FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    // 'sx' es como 'style' pero tiene acceso al theme: https://mui.com/system/getting-started/the-sx-prop/
    <Box sx={{ flexFlow: 1 }}>
        <Head>
            <title>{ title }</title>
        </Head>

        <Navbar />
        <Sidebar />

        <Box sx={{ padding: '10px 20px'}}>
          { children }
        </Box>
    </Box>
  )
};
