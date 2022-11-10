import * as React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DataGridDemo from './DataGridTable';

function Tabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: 'inherit', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }} id="tabs">
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label="All" value="1" />
                        <Tab label="Upcoming" value="2" />
                        <Tab label="Completed" value="3" />
                        <Tab label="Cancelled" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1"><DataGridDemo /></TabPanel>
                <TabPanel value="2"><DataGridDemo /></TabPanel>
                <TabPanel value="3"><DataGridDemo /></TabPanel>
                <TabPanel value="4"><DataGridDemo /></TabPanel>
            </TabContext>
        </Box>
    )
}

export default Tabs