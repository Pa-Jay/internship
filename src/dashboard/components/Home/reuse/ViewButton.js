import React from 'react'
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';

import { FaEye } from "react-icons/fa";
function ViewButton() {
  return (
    <Card sx={{boxShadow: 'none', background: 'none'}}>
        <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: 2}}><FaEye /></Button>
        </CardActions>
    </Card>
  )
}

export default ViewButton