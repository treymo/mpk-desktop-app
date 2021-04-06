import { createSlice, Slice } from '@reduxjs/toolkit';
import { Habit, createNewHabit } from '../../model/habit';

// TODO: these are actions that can be sent via a "Dispatch" from elsewhere in
// the app? See AddNewCardDialog for dispatch(addCard()) example
const habitSlice: Slice = createSlice({
  name: 'habit',
  initialState: {},
  reducers: {
    createHabit(state, action) {
      const { title, description } = action.payload;
      const newHabit: Habit = createNewHabit(title, description);

      // TODO: persistence? Do I just need to put the habits into the state to get
      // it to persist?  Any other changs?
      state.allIds.push(newHabit.id);
      state.byId[newHabit.id] = newHabit;
    },
    deleteHabit(state, action) {
      const habitToRemove = action.payload;
      const indexOfHabit = state.allIds.indexOf(habitToRemove);
      delete state.byId[habitToRemove];
      state.allIds.splice(indexOfHabit, 1);
    },
    renameHabit(state, action) {
      const { id, title } = action.payload;
      const habit = state.byId[id];
      habit.title = title;
    },
    updateHabitDay(state, action) {
      const { id, day, isCompleted } = action.payload;
      const habit = state.byId[id];
      habit.setHabitDay(day, isCompleted);
    },
  },
});

export const {
  createHabit,
  updateCard,
  deleteHabit,
  renameHabit,
} = habitSlice.actions;

export default habitSlice.reducer;
