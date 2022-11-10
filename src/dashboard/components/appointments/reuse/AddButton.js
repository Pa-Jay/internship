import React from 'react'
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';

import { FaPlus } from "react-icons/fa";
function AddButton() {
  return (
    <Card sx={{boxShadow: 'none', background: 'none'}}>
        <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: 2}}><FaPlus /></Button>
        </CardActions>
    </Card>
  )
}

export default AddButton