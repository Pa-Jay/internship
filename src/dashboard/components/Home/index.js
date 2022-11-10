import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import { BiAbacus } from "react-icons/bi";
import Typography from '@mui/material/Typography';
import Profile from '../../../images/profile-1.jpg'
import './style.css'
import { Link } from 'react-router-dom'
import DetailersProfileList from './reuse/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllDetailers } from '../../../store/features/detailers/detailerAction';
// import DataGridDemo from './reuse/DataGridTable';
function DashHome() {
    const { detailers } = useSelector((state) => state.detailer)
    const { userInfo } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDetailers())
    }, [dispatch])
  return (
    <div className="main" style={{display: 'flex', flexDirection: 'column'}}>
        <div className="first-div" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 50, minHeight: '250px', height: 'fit-content', flexWrap: 'wrap'}}>
            <Card sx={{ maxWidth: '100%', width: '40%', padding: 2, background: '#0D4E98', color: '#f9fbe7', borderRadius: '20px' }} id='wallet-card'>
                <CardMedia
                    component="img"
                    height="140"
                    image={Profile}
                    alt="green iguana"
                    sx={{width: '70px', height: '70px', borderRadius: '50%', float: 'right'}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{fontWeight: 400, fontSize: "16px", color: '#e0f2f1'}} component="div">
                        Balance
                    </Typography>
                    <Typography variant="body2"  sx={{position: 'relative', fontSize: '20px'}}>
                        #100,000
                    </Typography>
                </CardContent>
                <CardActions id='card-action' sx={{ justifyContent: 'space-between'}}>
                    <div className="actionBtn">
                        <button size="small" style={{color: "#f9fbe7", background: '#e53935'}}>Fund</button>
                    </div>
                    <div className="actionBtn">
                        <button size="small" style={{color: "#f9fbe7", background: '#00695c'}}>Transfer</button>
                    </div>
                </CardActions>
            </Card>
            <Card  sx={{maxWidth: '100%'}} id='stats-card'>
                <Card id='stats'>
                    <i style={{width: '50px', height: '50px', borderRadius: '50%', float: 'right', padding: 1.5, background: '#EFEBFF', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <BiAbacus style={{color: '#0D4E98', width: '25px', height: '25px' }}/>
                    </i>
                    <CardContent id='stats-card-content'>
                        <Typography variant="body2"  sx={{position: 'relative', fontSize: '20px', fontWeight: '600', color: '#0D4E98'}}>
                            100
                        </Typography>
                        <span>Transactions</span>
                    </CardContent>   
                </Card>
                <Card id='stats'>
                    <i style={{width: '50px', height: '50px', borderRadius: '50%', float: 'right', padding: 1.5, background: '#EFEBFF', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <BiAbacus style={{color: '#0D4E98', width: '25px', height: '25px' }}/>
                    </i>
                    <CardContent id='stats-card-content'>
                        <Typography variant="body2"  sx={{position: 'relative', fontSize: '20px', fontWeight: '600', color: '#0D4E98'}}>
                            1
                        </Typography>
                        <span>Reviews</span>
                    </CardContent>   
                </Card>
            </Card>
        </div>
        <div className="next-dev" style={{ width: 'inherit', height: 'fit-content' }}>
            <div className="become-a-detailer" style={{paddingBottom: "4rem"}}>
                <h2 style={{color: "#0D4E98", position: "relative", top: "40px"}}>Detailers</h2>
                {userInfo?.role === "user"
                ?
                    <Link to="/detailer/become-a-detailer" className="animate__animated animate__backInLeft animate__slower">Become a Detailer</Link>
                :
                    null
                }
            </div>
            <div className="profile-list" >
                <DetailersProfileList />
            </div>
        </div>
    </div>
  )
}

export default DashHome