import { useEffect } from "react";
import styled from "styled-components";
import useTimerStore from "../store/timerStore";
import TimerItem from "./TimerItem";

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
          <ListItemWrapper key={timer.id}>
            <TimerItem timer={timer} />
          </ListItemWrapper>
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

const ListItemWrapper = styled.div`
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 255, 171, 0.3);
  }
`;
