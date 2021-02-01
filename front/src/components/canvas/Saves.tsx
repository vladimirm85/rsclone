import React, { useEffect } from 'react';
import Fade from '@material-ui/core/Fade';
import {
  Modal,
  Backdrop,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import { connect } from 'react-redux';
import useStyles from './style';
import Preloader from '../common/Preloader/Preloader';
import { SavesType } from '../../types/types';
import TableFooterActions from '../table/TableFooter';
import { AppStateType } from '../../store/store';
import {
  loadUserSaves,
  deleteUserSave,
} from '../../store/action-creators/game-ac';
import { get } from '../../helpers/storage';
import { GameInterface } from './interfaces';
import dateCreator from '../../helpers/dateCreator';

type MapStatePropsType = {
  userSaves: Array<SavesType>;
  userSavesError: string;
  userSavesLoading: boolean;
};

type MapDispatchPropsType = {
  loadUserSaves: (key: string) => void;
  deleteUserSave: (key: string, id: string) => void;
};

type InputPropsType = {
  open: boolean;
  handleClose: () => void;
  gameObj: GameInterface | null;
  isPause: boolean;
  setIsPause: (isPause: boolean) => void;
};

type PropsType = MapStatePropsType & InputPropsType & MapDispatchPropsType;

const Saves: React.FC<PropsType> = (props): JSX.Element => {
  const {
    open,
    handleClose,
    userSaves,
    userSavesError,
    userSavesLoading,
    gameObj,
    isPause,
    setIsPause,
  } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyles();
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userSaves.length - page * rowsPerPage);
  const authKey = get('authKey');

  useEffect(() => {
    if (userSaves.length === 0 && !userSavesError) {
      props.loadUserSaves(authKey);
    }
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className={classes.modalContainer}>
            <div className={classes.modalHeader}>Saves</div>
            {userSavesError ? (
              <Typography
                variant="h5"
                component="h5"
                align="center"
                className={classes.error}
                paragraph
              >
                {userSavesError}
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  {userSavesLoading ? (
                    <Preloader />
                  ) : (
                    <>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? userSaves.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                            )
                          : userSaves
                        )
                          .reverse()
                          .map((row: SavesType) => (
                            <TableRow key={row.createdAt}>
                              <TableCell style={{ width: '50%' }}>
                                {dateCreator(row.createdAt)}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  startIcon={<DeleteIcon />}
                                  size="small"
                                  onClick={() => {
                                    props.deleteUserSave(authKey, row._id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  startIcon={<PublishIcon />}
                                  onClick={() => {
                                    if (gameObj) {
                                      setIsPause(!isPause);
                                      gameObj.setIsPause(!isPause);
                                      handleClose();
                                      gameObj.load(row.saveData);
                                    }
                                  }}
                                >
                                  Load
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 76 * emptyRows }}>
                            <TableCell colSpan={3} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooterActions
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        dataArray={userSaves}
                        rowsPerPage={rowsPerPage}
                        page={page}
                      />
                    </>
                  )}
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

const MapStateToProps = (state: AppStateType) => ({
  userSaves: state.gameData.userSaves,
  userSavesError: state.gameData.userSavesError,
  userSavesLoading: state.gameData.userSavesLoading,
});

const SavesW = connect(MapStateToProps, { loadUserSaves, deleteUserSave })(
  Saves,
);

export default SavesW;
