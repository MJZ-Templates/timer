import PropTypes from "prop-types"; // ✅ import 추가
import { useEffect, useState } from "react";
import { FaClock, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import useTimerStore from "../store/timerStore";


TimerItem.propTypes = {
  timer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};

const padNumber = (num) => String(num).padStart(2, "0");

const TimerItem = ({ timer }) => {
  const [remaining, setRemaining] = useState(timer.duration);
  const [isRunning, setIsRunning] = useState(false);
  const {removeTimer, updateTimer} = useTimerStore();

  useEffect(() => {
    let interval;
    if (isRunning && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => Math.max(0, prev - 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const toggleTimer = () => {
    if (isRunning) {
      updateTimer(timer.id, { duration: remaining });
    }
    setIsRunning((prev) => !prev);
  };

  const handleDelete = () => {
    removeTimer(timer.id);
  };

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return (
    <ItemContainer onClick={toggleTimer}>
      <IconWrapper><FaClock /></IconWrapper>
      <TextContainer>
        <TimerName>{timer.name}</TimerName>
        <TimerTime>
          {padNumber(hours)}:{padNumber(minutes)}:{padNumber(seconds)}
        </TimerTime>
      </TextContainer>
      <ButtonGroup>
        <IconButton onClick={toggleTimer} title={isRunning ? "Pause" : "Start"}>
          {isRunning ? <FaPause /> : <FaPlay />}
        </IconButton>
        <IconButton onClick={handleDelete} title="Delete">
          <FaTrash />
        </IconButton>
      </ButtonGroup>
    </ItemContainer>
  );
};

export default TimerItem;

// styled-components
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #222;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 255, 171, 0.1);
  cursor: pointer;
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #00FFAB;
  margin-right: 12px;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TimerName = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: #ffffff;
`;

const TimerTime = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  color: #00FFAB;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    color: #00FFAB;
  }
`;
