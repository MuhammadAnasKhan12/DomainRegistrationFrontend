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
  Checkbox,
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

// Table header configuration for domain fields
const headCells = [
  { id: 'domainName', label: 'Domain Name', numeric: false },
  { id: 'WhoisPrivacy', label: 'Privacy Enabled', numeric: false },
  { id: 'registrationAgreementCheck', label: 'Agreement Accepted', numeric: false },
  { id: 'acceptedFAQ', label: 'FAQ Accepted', numeric: false },
  { id: 'terms', label: 'Terms', numeric: false },
  { id: 'language', label: 'Language', numeric: false },
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
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
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
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Domain List
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Edit">
        <IconButton onClick={onEdit} disabled={numSelected === 0}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default function EnhancedTable({ domainList, onDeleteDomain, onUpdateDomain,onOpenDetailPage }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('domainName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // For edit modal
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = domainList.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) newSelected = [...selected, id];
    else if (selectedIndex === 0) newSelected = selected.slice(1);
    else if (selectedIndex === selected.length - 1) newSelected = selected.slice(0, -1);
    else if (selectedIndex > 0)
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => setDense(event.target.checked);

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - domainList.length);

  const visibleRows = React.useMemo(
    () =>
      [...domainList]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, domainList]
  );

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDelete = async () => {
    try {
      await onDeleteDomain(selected);
      setSelected([]);
    } catch (error) {
      console.error("Error deleting domains", error);
    }
  };

  const handleEdit = async () => {
    const domainToEdit = domainList.find((domain) => domain._id === selected[0]);
    setEditData(domainToEdit);
    setOpenEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await onUpdateDomain(editData);
      setOpenEditModal(false);
      setEditData(null);
    } catch (error) {
      console.error("Error updating domain", error);
    }
  };
  const handleDetailPage   = (val) => {
    onOpenDetailPage(val); 
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={domainList.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row._id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell  ><span >
                      <button style={{cursor:"pointer",fontWeight:"700"}} onClick={()=>handleDetailPage(row._id)}>
                      {row.domainName}

                      </button>
                      </span></TableCell>
                    <TableCell>{row.WhoisPrivacy ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{row.registrationAgreementCheck ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{row.acceptedFAQ ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{row.terms}</TableCell>
                    <TableCell>{row.language}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={domainList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Domain</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Domain Name"
            value={editData?.domainName || ''}
            onChange={(e) => setEditData({ ...editData, domainName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Terms"
            value={editData?.terms || ''}
            onChange={(e) => setEditData({ ...editData, terms: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Language"
            value={editData?.language || ''}
            onChange={(e) => setEditData({ ...editData, language: e.target.value })}
            margin="normal"
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

EnhancedTable.propTypes = {
  domainList: PropTypes.array.isRequired,
  onDeleteDomain: PropTypes.func.isRequired,
  onUpdateDomain: PropTypes.func.isRequired,
  onOpenDetailPage: PropTypes.func.isRequired
};
