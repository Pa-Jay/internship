import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { UsersAPI } from '../../../../apis/UsersAPI';
import { useEffect } from 'react';
import { SettingsInputAntenna } from '@mui/icons-material';
import { useSelector } from 'react-redux';


// import ViewButton from './ViewButton';
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

  const RenderAction = (props) => {
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
        <div style={{display: 'flex', flexDirection: 'row', gap: 5, padding: 1, justifyContent: "space-between"}}>
            <Link to='/appointment/view'><Button size="small" sx={{background: '#4caf50', color: '#fcfcfc', textAlign: 'center', padding: 0.5}}><FaEye /></Button></Link>
            <Link to='/appointment/cancel'><Button size="small" sx={{background: '#f44336', color: '#fcfcfc', textAlign: 'center', padding: 0.5}}><BiX style={{width: 50}}/></Button></Link>
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

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'name',
    headerName: 'Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 130,
    renderCell: RenderDate,
  },
  {
    field: 'service',
    headerName: 'Service',
    width: 150,
    editable: false,
    valueGetter: (params) =>
      `${params.row.lastName}`
  },
  {
    field: 'type',
    headerName: 'User Type',
    width: 120,
    valueGetter: (params) =>
      `${params.row.type}`,
    editable: false,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    editable: false,
    renderCell: RenderAction
  },
];



export default function UsersGrid() {
  const [id, setId] = React.useState(0);
  const { users } = useSelector((state) => state.user)
  const [user, setUsers] = React.useState([])

  useEffect( () => {
    const fetchUsers = async () => {
     
      await UsersAPI.getAllUsers()
      .then((users) => {
        setUsers(users)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    fetchUsers();
    console.log(users)
    
  }, [])

  
  const rows = user.map((user, index) => 
        (
          {
            id: index + 1, 
            firstName: user.firstName, 
            lastName: user.lastName, 
            type: user.role, 
            identity: user._id 
          }
        )
      // }    
)

  // console.log(user)
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
