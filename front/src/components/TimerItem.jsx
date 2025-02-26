import styled from "styled-components";
import PropTypes from "prop-types";
import useTimerStore from "../store/timerStore";
import { useState, useEffect } from "react";
import { updateTimer } from "../api/timerApi";
import { FaPlay, FaPause, FaTrash } from "react-icons/fa";

const durationFormat = (duration) => {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const TimerItem = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer.duration);
  const [isRunning, setIsRunning] = useState(false);
  const removeTimer = useTimerStore((state) => state.removeTimer);
  const updateTimerInStore = useTimerStore((state) => state.updateTimer);

  useEffect(() => {
    let interval;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 10);
      }, 10);
    } else if (remainingTime <= 0) {
      clearInterval(interval);
      setIsRunning(false);

      const updateTimerAsync = async () => {
        updateTimerInStore(timer.id, { duration: 0 });
        await updateTimer(timer.id, { duration: 0 });
      };

      updateTimerAsync();
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingTime, timer.id, updateTimerInStore]);

  const handleToggle = async () => {
    if (isRunning) {
      updateTimerInStore(timer.id, { duration: remainingTime });
      await updateTimer(timer.id, { duration: remainingTime });
    }
    setIsRunning((prev) => !prev);
  };

  return (
    <TimerContainer>
      <StyledButton onClick={handleToggle} disabled={remainingTime <= 10}>
        {isRunning ? <FaPause /> : <FaPlay />}
      </StyledButton>
      <StyledText>{durationFormat(remainingTime)}</StyledText>
      <StyledButton onClick={() => removeTimer(timer.id)}>
        <FaTrash />
      </StyledButton>
    </TimerContainer>
  );
};

TimerItem.propTypes = {
  timer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};

export default TimerItem;

const TimerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px 0;
  width: 250px;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-left: 5px;
  margin-right: 5px;
`;

const StyledText = styled.p`
  text-align: center;
  font-size: 20px;
`;
