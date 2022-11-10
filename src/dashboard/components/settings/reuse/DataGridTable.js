import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
// import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { getAllServices } from '../../../../store/features/users/userAction';

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
        <div style={{display: 'flex', flexDirection: 'row', gap: 25, padding: 1}}>
            <Link to='/appointment/view'><Button size="small" sx={{background: '#4caf50', color: '#fcfcfc', textAlign: 'center', padding: 0.5}}><FaEdit /></Button></Link>
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
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'desc',
    headerName: 'desc',
    width: 150,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    width: 140,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    editable: false,
    renderCell: RenderAction
  },
];

const row = [
  { id: 1, lastName: 'Snow', firstName: 'Jon',  },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', },
  { id: 4, lastName: 'Stark', firstName: 'Arya', },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',},
  { id: 6, lastName: 'Melisandre', firstName: null, },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', date: new Date()},
];

export default function DataGridDemo() {
  const { services } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllServices())
  })

  const rows = services.map((service, index) => (
    { id: index + 1, name: service.name, status: service.status, desc: service.desc}
  ))
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
