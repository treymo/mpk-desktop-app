import React from 'react';
import Button from '@material-ui/core/Button';

import { Clear, MoreVert } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';

import styles from './HabitPanel.css';
//import { createHabit } from '../features/habits/habitSlice';
import { createNewHabit, Habit } from '../model/habit';

function showMoreOptionsDialog() {}

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const numDays = 7;

function habitDateRow(): JSX.Element {
  const cursor = new Date();
  const result = [];

  // Start from (numDays - 1) days before today.
  cursor.setDate(cursor.getDate() - numDays + 1);
  while (!isToday(cursor)) {
    result.push(
      <td key={cursor.toISOString()}>
        {cursor.toDateString()}
      </td>
    );
    cursor.setDate(cursor.getDate() + 1);
  }
  return (
    <tr>
      <td />
      {result}
    </tr>
  );
}

function habitHistoryColumns(clickOpenHandler: () => void): JSX.Element[] {
  const cursor = new Date();
  const result = [];

  // Start from (numDays - 1) days before today.
  cursor.setDate(cursor.getDate() - numDays + 1);
  while (!isToday(cursor)) {
    result.push(
      <td key={cursor.toISOString()}>
        <IconButton onClick={() => clickOpenHandler()}>
          <Clear />
        </IconButton>
      </td>
    );
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

// TODO: this whole thing should re-render when a button is pressed. Props,
// observers, etc. const [thing, setThing] = React.useState(false);
function renderHabits(dispatch, clickOpenHandler: () => void): JSX.Element[] {
  // TODO: load habits from store, turn to HTML
  //dispatch(
    //createHabit({
      //title: 'New Habit!',
      //description: 'this is something you should do',
    //})
  //);
  const habits: Habit[] = [
    createNewHabit('Habit one', 'description'),
    createNewHabit('Habit two', 'description'),
    createNewHabit('Habit three', 'description'),
    createNewHabit('Habit four', 'description'),
  ];

  const habitRows: JSX.Element[] = [];
  habitRows.push(habitDateRow());
  habits.forEach((habit: Habit) => {
    habitRows.push(
      <tr key="{habit.id}">
        {habit.title}
        {habitHistoryColumns(clickOpenHandler)}
      </tr>
    );
  });

  return habitRows;
}

export default function HabitPanel(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const habitRows = renderHabits(dispatch, handleClickOpen);

  return (
    <div className={styles.habitsContainer} data-tid="habitsContainer">
      <div className={styles.habitsHeader}>
        <span>Habits</span>
        <IconButton onClick={() => showMoreOptionsDialog()}>
          <MoreVert style={{ fontSize: 16 }} />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">You clicked a habit</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"TODO: Toggle this habit's status for that day."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Sweet!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <table>
        <td>
          {habitRows}
        </td>
      </table>
    </div>
  );
}
