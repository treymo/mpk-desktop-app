import React from 'react';
import Box from '@material-ui/core/Box';
import Board from '../components/Board';
import HabitPanel from '../components/HabitPanel';
import SideBar from '../components/SideBar';
import styles from './HomePage.css';
import SearchBox from '../components/SearchBox';

export default function HomePage() {
  return (
    <div className={styles.body}>
      <Box
        border={1}
        borderLeft={0}
        borderBottom={0}
        borderTop={0}
        borderColor="grey.700"
      >
        <SideBar />
      </Box>
      <Box className={styles.content}>
        <Board />
        <HabitPanel />
        <div className={styles.footer}>
          <SearchBox />
        </div>
      </Box>
    </div>
  );
}
