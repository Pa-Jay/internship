import * as React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import DataGridDemo from '../../users/reuse/DataGridTable';
import { Outlet, Link } from 'react-router-dom'
import './style.css'
import { useSelector } from 'react-redux';

function Settings() {
    const [value, setValue] = React.useState(0);
    const { userInfo } = useSelector((state) => state.user)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {
      const mainMenuLi = document
          .getElementById('tab-list')
          .querySelectorAll('a');

          function changeActive() {
              mainMenuLi.forEach(n => n.classList.remove('active'));
              this.classList.add('active');
          }

          mainMenuLi.forEach(n => n.addEventListener('click', changeActive))
  }, [])
    return (
        <Box sx={{ width: 'inherit', typography: 'body1' }} id='settings-box'>
            <TabContext id='tab-content' value={value} >
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, width: 'inherit', overflowX: 'visible' }} id="tabs">
                    <TabList onChange={handleChange} aria-label="lab API tabs example" id='tab-list'>
                        <Link to={`/setting/edit-profile/${userInfo._id}`}code ><Tab label="Edit Profile" value="0" onClick={(e) => setValue(e.target.value)}/></Link>
                        <Link to='password'><Tab label="Password" value="1" onClick={(e) => setValue(e.target.value)}/></Link>
                        {userInfo?.role === "user"
                        ?
                            null
                        :
                            <Link to='services'><Tab label="Services" value="2" onClick={(e) => setValue(e.target.value)}/></Link>
                        }
                        <Link to='avatar'><Tab label="Avatar" value="3" onClick={(e) => setValue(e.target.value)}/></Link>
                    </TabList>
                </Box>
                <TabPanel value={value} id='tab-panel' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'fit-content'}}><Outlet></Outlet></TabPanel>
            </TabContext>
        </Box>
    )
}

export default Settings