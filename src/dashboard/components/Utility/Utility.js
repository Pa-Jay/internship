import React from 'react'
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import { BiDialpadAlt } from "react-icons/bi";
import Typography from '@mui/material/Typography';

function Utility() {
  return (
    <div className='utility'>
        <h2 style={{color: '#0D4E98', marginBottom: '30px'}}>Apps</h2>
        <div className="util" style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <Card id='app' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30%', flexDirection: 'column'}}>
                <i style={{width: '70px', height: '70px', borderRadius: '50%', float: 'right', padding: 1, background: '#EFEBFF', padding: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BiDialpadAlt style={{color: '#0D4E98', width: '35px', height: '35px' }}/>
                </i>
                <CardContent id='util-card-content'>
                    
                    <Typography variant="body2"  sx={{position: 'relative', fontSize: '20px', fontWeight: '600', color: '#0D4E98'}}>
                        Utilities
                    </Typography>
                    <span></span>
                </CardContent>   
            </Card>
            <Card id='app' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30%', flexDirection: 'column'}}>
                <i style={{width: '70px', height: '70px', borderRadius: '50%', float: 'right', padding: 1, background: '#EFEBFF', padding: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BiDialpadAlt style={{color: '#0D4E98', width: '25px', height: '25px' }}/>
                </i>
                <CardContent id='util-card-content'>
                    <Typography variant="body2"  sx={{position: 'relative', fontSize: '20px', fontWeight: '600', color: '#0D4E98'}}>
                        News
                    </Typography>
                </CardContent>   
            </Card>
            <Card id='app' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30%', flexDirection: 'column'}}>
                <i style={{width: '70px', height: '70px', borderRadius: '50%', float: 'right', padding: 1, background: '#EFEBFF', padding: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BiDialpadAlt style={{color: '#0D4E98', width: '25px', height: '25px' }}/>
                </i>
                <CardContent id='util-card-content'>
                    <Typography variant="body2"  sx={{position: 'relative', fontSize: '20px', fontWeight: '600', color: '#0D4E98'}}>
                        <span>Reviews</span>
                    </Typography>
                </CardContent>   
            </Card>
        </div>
    </div>
  )
}

export default Utility