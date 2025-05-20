import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

// Updated header for new fields
const headCells = [
  {id:"_id", label:"Id"},
  {id:"category", label:"Type"},
  {id: 'company', label: 'Company', numeric: false },
  {id: 'firstname', label: 'First Name', numeric: false },
  {id: 'telephoneNumber', label: 'Telephone', numeric: false },
  {id: 'email', label: 'Email', numeric: false },
  {id: 'city', label: 'City', numeric: false },
  {id: 'country', label: 'Country', numeric: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

function EnhancedTableToolbar({ numSelected, onDelete, onEdit }) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6">
        Contact List
      </Typography>
      <Tooltip title="Filter list">
        <IconButton><FilterListIcon /></IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default function EnhancedTable({ domainList, onDeleteDomain, onUpdateDomain, onOpenDetailPage }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('company');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => setDense(event.target.checked);

  const visibleRows = React.useMemo(() =>
    [...domainList]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, domainList]
  );

  const handleDelete = async () => {
    await onDeleteDomain();
  };

  const handleEdit = () => {
    const toEdit = domainList.find((item) => item._id === selected[0]);
    setEditData(toEdit);
    setOpenEditModal(true);
  };

  const handleSaveEdit = async () => {
    await onUpdateDomain(editData);
    setOpenEditModal(false);
    setEditData(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={0} onDelete={handleDelete} onEdit={handleEdit} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover key={row._id}>
                  <TableCell><span style={{fontWeight:"600", cursor:"pointer"}} onClick={()=>onOpenDetailPage(row._id)}>{row._id}</span></TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{`${row.firstname} ${row.lastname}`}</TableCell>
                  <TableCell>{row.telephoneNumber}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={domainList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Company" value={editData?.company || ''} onChange={(e) => setEditData({ ...editData, company: e.target.value })} margin="normal" />
          <TextField fullWidth label="First Name" value={editData?.firstname || ''} onChange={(e) => setEditData({ ...editData, firstname: e.target.value })} margin="normal" />
          <TextField fullWidth label="Email" value={editData?.email || ''} onChange={(e) => setEditData({ ...editData, email: e.target.value })} margin="normal" />
          <TextField fullWidth label="Phone" value={editData?.telephoneNumber || ''} onChange={(e) => setEditData({ ...editData, telephoneNumber: e.target.value })} margin="normal" />
          <TextField fullWidth label="City" value={editData?.city || ''} onChange={(e) => setEditData({ ...editData, city: e.target.value })} margin="normal" />
          <TextField fullWidth label="Country" value={editData?.country || ''} onChange={(e) => setEditData({ ...editData, country: e.target.value })} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

EnhancedTable.propTypes = {
  domainList: PropTypes.array.isRequired,
  onDeleteDomain: PropTypes.func.isRequired,
  onUpdateDomain: PropTypes.func.isRequired,
  onOpenDetailPage: PropTypes.func.isRequired,
};
