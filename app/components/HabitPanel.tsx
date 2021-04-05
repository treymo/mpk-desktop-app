import React from 'react';

import { MoreVert } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import styles from './HabitPanel.css';

function showMoreOptionsDialog() {}

export default function HabitPanel() {
  let habitRows = [
    <tr>Row one</tr>,
    <tr>Row two</tr>,
    <tr>Row three</tr>,
    <tr>Row four</tr>,
  ];


  return (
    <div className={styles.habitsContainer} data-tid="habitsContainer">
      <div className={styles.habitsHeader}>
        <span>Habits</span>
        <IconButton onClick={() => showMoreOptionsDialog()}>
          <MoreVert style={{ fontSize: 12 }} />
        </IconButton>
      </div>
      <table>
        <td>
          {habitRows}
        </td>
      </table>
    </div>
  );
}
