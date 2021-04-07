import { createSlice, Slice } from '@reduxjs/toolkit';
import { Habit, createNewHabit } from '../../model/habit';

const habitSlice: Slice = createSlice({
  name: 'habits',
  initialState: {},
  reducers: {
    createHabit(state, action) {
      const { title, description } = action.payload;
      const newHabit: Habit = createNewHabit(title, description);
      state.allIds.push(newHabit.id);
      state.thing = title;
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
  deleteHabit,
  renameHabit,
  updateHabitDay,
} = habitSlice.actions;

export default habitSlice.reducer;
