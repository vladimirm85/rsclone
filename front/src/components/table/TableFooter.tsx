import React from 'react';
import { TableFooter, TablePagination, TableRow } from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';
import { SavesType, ScoreType } from '../../types/types';

type PropsType = {
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  dataArray: Array<ScoreType> | Array<SavesType>;
  rowsPerPage: number;
  page: number;
};

const TableFooterActions: React.FC<PropsType> = ({
  setPage,
  setRowsPerPage,
  dataArray,
  rowsPerPage,
  page,
}): JSX.Element => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={4}
          count={dataArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default TableFooterActions;
