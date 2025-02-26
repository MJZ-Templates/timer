import { useEffect } from "react";
import useTimerStore from "../store/timerStore";
import TimerItem from "./TimerItem";
import styled from "styled-components";

const TimerList = () => {
  const { timers, loadTimers } = useTimerStore();

  useEffect(() => {
    loadTimers();
  }, [loadTimers]);

  return (
    <StyledList>
      {timers
        .slice()
        .reverse()
        .map((timer) => (
          <TimerItem key={timer.id} timer={timer} />
        ))}
    </StyledList>
  );
};

export default TimerList;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
