import * as React from 'react';
import PropTypes from 'prop-types';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  { id: 'domainName', label: 'Domain Name' },
  { id: 'Registrant', label: 'Registrant' },
  { id: 'Admin', label: 'Admin' },
  { id: 'Billing', label: 'Billing' },
  { id: 'Technical', label: 'Technical' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy]?.firstname < a[orderBy]?.firstname) return -1;
  if (b[orderBy]?.firstname > a[orderBy]?.firstname) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number,
onSelectAllClick: PropTypes.func.isRequired,
rowCount:PropTypes.number,
onRequestSort: PropTypes.func.isRequired,


}

function EnhancedTableToolbar({ numSelected, onDelete, onEdit }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
        {numSelected > 0 ? `${numSelected} selected` : ' '}
      </Typography>
      {numSelected > 0 ? (
        <>
          <Tooltip title="Edit"><IconButton onClick={onEdit}><EditIcon /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton onClick={onDelete}><DeleteIcon /></IconButton></Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list"><IconButton><FilterListIcon /></IconButton></Tooltip>
      )}
    </Toolbar>
  );
}
EnhancedTableToolbar.propTypes={
  numSelected: PropTypes.any,
  onDelete: PropTypes.func.isRequired,
  onEdit : PropTypes.func.isRequired,
  
}

function renderAccordion(title, contact) {
  if (!contact) return <p>N/A</p>;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">{contact.firstname} {contact.lastname}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Object.entries(contact).map(([key, value]) => (
          key !== "_id" && key !== "__v" ? (
            <Typography key={key} variant="body2">
              <strong>{key}:</strong> {value}
            </Typography>
          ) : null
        ))}

      </AccordionDetails>
    </Accordion>
  );
}

export default function   EnhancedAccordionTable({ domainList, onDeleteDomain, onUpdateDomain }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('domainName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(domainList.map((d) => d._id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    const newSelected = [...selected];
    if (selectedIndex === -1) newSelected.push(id);
    else newSelected.splice(selectedIndex, 1);
    setSelected(newSelected);
  };

  const handleDelete = () => {
    onDeleteDomain(selected);
    setSelected([]);
  };

  const handleEdit = () => {
    const domain = domainList.find((d) => d._id === selected[0]);
    setEditData(domain);
    setOpenEditModal(true);
  };

  const handleSaveEdit = async () => {
    await onUpdateDomain(editData);
    setOpenEditModal(false);
  };

  const visibleRows = React.useMemo(() =>
    domainList
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [domainList, order, orderBy, page, rowsPerPage]);

  const isSelected = (id) => selected.includes(id);

  return (
    <Box sx={{ Width: '100%' }}>
      <Paper sx={{ width: '90%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete} onEdit={handleEdit} />
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              rowCount={domainList.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row._id);
                return (
                  <TableRow key={row._id} selected={isItemSelected} hover onClick={(event) => handleClick(event, row._id)}>
                    <TableCell padding="checkbox"><Checkbox checked={isItemSelected} /></TableCell>
                    <TableCell>{row.domainName}</TableCell>
                    <TableCell>{renderAccordion('Registrant', row.Registrant)}</TableCell>
                    <TableCell>{renderAccordion('Admin', row.Admin)}</TableCell>
                    <TableCell>{renderAccordion('Billing', row.Billing)}</TableCell>
                    <TableCell>{renderAccordion('Technical', row.Technical)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={domainList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={(e) => setDense(e.target.checked)} />}
        label="Dense padding"
      />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

EnhancedAccordionTable.propTypes = {
  domainList: PropTypes.array.isRequired,
  onDeleteDomain: PropTypes.func.isRequired,
  onUpdateDomain: PropTypes.func.isRequired,
};
