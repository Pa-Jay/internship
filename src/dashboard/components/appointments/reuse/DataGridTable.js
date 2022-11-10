import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { DataGrid, GridCellEditStopReasons } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allAppointments, getAppointmentDetails } from '../../../../store/features/appointments/appointmentAction';
import EditAppointment from '../edit';


// import('@mui/x-data-grid'

const RenderDate = (props) => {
    const { hasFocus, value } = props;
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);
  
    React.useLayoutEffect(() => {
      if (hasFocus) {
        const input = buttonElement.current?.querySelector('input');
        input?.focus();
      } else if (rippleRef.current) {
        // Only available in @mui/material v5.4.1 or later
        rippleRef.current.stop({});
      }
    }, [hasFocus]);
  
    return (
      <strong>
        {value?.getDate() ?? ''}
      </strong>
    );
  };
  
  RenderDate.propTypes = {
    /**
     * If true, the cell is the active element.
     */
    hasFocus: PropTypes.bool.isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    // value: PropTypes.instanceOf(Date),
  };

 

  

export default function DataGridDemo() {
  const { userInfo } = useSelector((state) => state.user)
  const [appointment, setAppointment] = React.useState({});
  const { appointments } = useSelector((state) => state.appointment)
  const [open, setOpen] = React.useState(false);
 
  const handleClose = () => setOpen(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allAppointments())
    
  }, [])
  const RenderAction = (props) => {
    const { hasFocus, value } = props;
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);

    const handleOpen = () => {
      dispatch(getAppointmentDetails(props.row))
      
      setOpen(true);
    }
  
    React.useLayoutEffect(() => {
      if (hasFocus) {
        const input = buttonElement.current?.querySelector('input');
        input?.focus();
        console.log(value)
      } else if (rippleRef.current) {
        // Only available in @mui/material v5.4.1 or later
        rippleRef.current.stop({});
      }
    }, [hasFocus]);
  
    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: 3, padding: 1}}>
            {/* <Link to='/appointment/view'><Button size="small" sx={{background: '#4caf50', color: '#fcfcfc', textAlign: 'center', padding: 0.5}}><FaEye /></Button></Link> */}
            <Button onClick={handleOpen} size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: 0.5}}><FaEye /></Button>
            <Link to='cancel'><Button size="small" sx={{background: '#f44336', color: '#fcfcfc', textAlign: 'center', padding: 0.5}}><BiX style={{width: 50}}/></Button></Link>
        </div>
    );
  };
  
  RenderAction.propTypes = {
    /**
     * If true, the cell is the active element.
     */
    hasFocus: PropTypes.bool.isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.instanceOf(Date),
  };

  if(userInfo?.role === "user"){
    
  }

const columns = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'name',
    headerName: 'Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 120,
    hideable: userInfo?.role === "user" ? true : false,
  },
  {
    field: 'brand',
    headerName: 'Detailer',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 120,
    hideable: userInfo?.role === "user" ? false : true,
  },
  {
    field: 'service',
    headerName: 'Service',
    width: 120,
    editable: false,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 130,
    // renderCell: RenderDate,
  },

  
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    editable: false,
    renderCell: RenderAction
  },
];

const serviceTags = (tags) => {
    tags.map((element, index) => {
          <span style={{color: "#000", background: "#0D4E98"}} key={element._id}>{"element.name"}</span>
    });
}

const rows = appointments.map((appointment, index) => 
  (
    {
      id: index + 1, 
      name: appointment.bookedBy.firstName, 
      brand: appointment.detailer.firstName + ' ' + appointment.detailer.lastName, 
      status: appointment.status, 
      service: serviceTags(appointment.services),
      price: appointment.price,
      date: new Date(appointment.date),
      time: appointment.time,
      _id: appointment._id 
    }
  )
// }    
)
  return (
    <div className="appoint">
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            // pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onCellEditStop={(params, event) => {
              if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                event.defaultMuiPrevented = true;
              }
            }}
            editMode="row"
            isCellEditable={(params) => params.row.status !== 'completed'}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>

        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <EditAppointment />
        </Box>
      </Modal>
    </div>
    
  );
}
