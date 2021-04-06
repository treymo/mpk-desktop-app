import { v4 as uuidv4 } from 'uuid';

export type DateTimeInMiliseconds = number;

export interface Habit {
  title: string;
  description: string;
  id: string;
  lastModified: DateTimeInMiliseconds;
  createdAt?: DateTimeInMiliseconds;
  tags: Array<string>;
  targetDaily: number;
  targetWeekly: number;
  deadline?: DateTimeInMiliseconds;
  pastDeadline?: boolean;
}

const createHabit = (
  title: string,
  description: string,
  tags: Array<string>
): Habit => {
  return {
    title,
    description,
    id: uuidv4(),
    lastModified: Date.now(),
    createdAt: Date.now(),
    targetDaily: -1,
    targetWeekly: 7,
    tags,
  };
};

export { createHabit };
