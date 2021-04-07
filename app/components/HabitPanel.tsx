import React from 'react';
import Button from '@material-ui/core/Button';

import { Clear, MoreVert } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

import styles from './HabitPanel.css';
import { createHabit } from '../features/habits/habitSlice';
import { createNewHabit, Habit } from '../model/habit';

function showMoreOptionsDialog() {}

const selectHabits = (state: RootState): Habit => {
  return state.habits.allIds;
};

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

function renderHabits(habits: Habit[], clickOpenHandler: () => void): JSX.Element[] {
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
  // TODO: get all Habits
  //const habits = useSelector(selectHabits);
  const habits: Habit[] = [
    createNewHabit('Habit one', 'description'),
    createNewHabit('Habit two', 'description'),
    createNewHabit('Habit three', 'description'),
    createNewHabit('Habit four', 'description'),
  ];

  const thing = useSelector((state) => state.habits.thing);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    // TODO: remove
    dispatch(
      createHabit({
        title: 'New Habit!',
        description: 'this is something you should do',
      })
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const habitRows = renderHabits(habits, handleClickOpen);

  return (
    <div className={styles.habitsContainer} data-tid="habitsContainer">
      <div className={styles.habitsHeader}>
        <span>Habits {thing}</span>
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
