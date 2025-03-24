import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaFlag, FaPause, FaPlay, FaRedo } from "react-icons/fa";
import styled from "styled-components";

const Stopwatch = ({ onTitleClick }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [lastLapTime, setLastLapTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 10;
          setRotation((newTime / 5000) * 360);
          return newTime;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleLap = () => {
    const lapDuration = time - lastLapTime;
    const newLaps = [...laps, lapDuration];
    setLaps(newLaps);
    setLastLapTime(time);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setRotation(0);
    setLastLapTime(0);
  };

  const formatLapTime = (milliseconds) => {
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(ms).padStart(3, "0")}`;
  };

  const minLap = Math.min(...laps, Infinity);
  const maxLap = Math.max(...laps, -Infinity);

  return (
    <Container>
      <Title onClick={onTitleClick}>⏱ Stopwatch</Title>
      <Circle onClick={handleStartStop}>
        <RotatingDot rotation={rotation} />
        <TimeText>{formatLapTime(time)}</TimeText>
      </Circle>
      <ButtonContainer>
        <StyledButton onClick={handleStartStop} color="#00FFAB">
          {isRunning ? <FaPause /> : <FaPlay />}
        </StyledButton>
        {isRunning ? (
          <StyledButton onClick={handleLap} color="#FFD700">
            <FaFlag />
          </StyledButton>
        ) : (
          <StyledButton onClick={handleReset} color="#FF6B6B">
            <FaRedo />
          </StyledButton>
        )}
      </ButtonContainer>
      <LapList>
        {laps.map((lap, index) => (
          <LapItem
            key={index}
            isMin={lap === minLap}
            isMax={lap === maxLap}
          >
            #{index + 1} - {formatLapTime(lap)}
          </LapItem>
        ))}
      </LapList>
    </Container>
  );
};

Stopwatch.propTypes = {
  onTitleClick: PropTypes.func.isRequired,
};

export default Stopwatch;

const Container = styled.div`
  height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #0d0d0d;
  color: white;
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #00FFAB;
  font-size: 2rem;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 5px solid #00FFAB;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  box-shadow: 0 0 30px rgba(0, 255, 171, 0.3);
  cursor: pointer;
`;

const RotatingDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: #FFD700;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform-origin: center bottom;
  transform: ${({ rotation }) => `rotate(${rotation}deg) translate(-50%, -135px)`};
  transition: transform 0.01s linear;
`;

const TimeText = styled.div`
  font-size: 2rem;
  font-family: 'Courier New', monospace;
  color: #00FFAB;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
`;

const StyledButton = styled.button`
  background-color: ${({ color }) => color || "#333"};
  color: black;
  border: none;
  border-radius: 12px;
  font-size: 1.5rem;
  padding: 12px 16px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.2);
  }
`;

const LapList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
  width: 240px;
  max-height: 300px;
  overflow-y: auto;
`;

const LapItem = styled.li`
  font-size: 1rem;
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: ${({ isMin, isMax }) =>
    isMin ? "#32cd32" : isMax ? "#ff6347" : "#222"};
  color: white;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
`;
