import { v4 as uuidv4 } from 'uuid';

export type DateTimeInMiliseconds = number;

interface HabitDay {
  date: Date;
  completed: boolean;
}

export interface Habit {
  title: string;
  description: string;
  id: string;
  lastModified: DateTimeInMiliseconds;
  createdAt?: DateTimeInMiliseconds;
  days: Array<HabitDay>; // end of list is most recent day.
  targetDaily: number;
  targetWeekly: number;
}

const createNewHabit = (title: string, description: string): Habit => {
  return {
    title,
    description,
    id: uuidv4(),
    lastModified: Date.now(),
    createdAt: Date.now(),
    targetDaily: -1,
    targetWeekly: 7,
    days: new Array<HabitDay>(),
  };
};

export { createNewHabit };
