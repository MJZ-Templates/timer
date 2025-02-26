import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaPlay, FaPause, FaFlag, FaRedo } from "react-icons/fa";

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

  const handleStartStop = async () => {
    setIsRunning((prev) => !prev);
  };

  const handleLap = async () => {
    const lapDuration = time - lastLapTime;
    const newLaps = [...laps, lapDuration];
    setLaps(newLaps);
    setLastLapTime(time);
  };

  const handleReset = async () => {
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
      <h1 onClick={onTitleClick}>Stopwatch</h1>
      <Circle>
        <RotatingDot rotation={rotation} />
        <TimeText>{formatLapTime(time)}</TimeText>
      </Circle>
      <ButtonContainer>
        <StyledButton onClick={handleStartStop}>
          {isRunning ? <FaPause /> : <FaPlay />}
        </StyledButton>
        {isRunning ? (
          <StyledButton onClick={handleLap}>
            <FaFlag />
          </StyledButton>
        ) : (
          <StyledButton onClick={handleReset}>
            <FaRedo />
          </StyledButton>
        )}
      </ButtonContainer>
      <LapList>
        {laps.map((lap, index) => (
          <LapItem
            key={index}
            color={
              lap === minLap ? "#32CD32" : lap === maxLap ? "#FF4500" : "black"
            }
          >
            {formatLapTime(lap)}
          </LapItem>
        ))}
      </LapList>
    </Container>
  );
};

export default Stopwatch;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const Circle = styled.div`
  width: 250px; /* 원의 크기를 키움 */
  height: 250px; /* 원의 크기를 키움 */
  border-radius: 50%;
  border: 4px solid #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RotatingDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform-origin: center bottom; /* 회전 중심을 아래쪽으로 설정 */
  transform: ${({ rotation }) =>
    `rotate(${rotation}deg) translate(-50%, -125px)`}; /* 시계 방향 회전 및 위치 조정 */
`;

const TimeText = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const LapList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
  width: 200px;
  text-align: center;
  overflow-y: auto;
  max-height: 400px;
`;

const LapItem = styled.li`
  font-size: 24px;
  font-weight: bold;
  color: ${({ color }) => color};
  padding: 5px;
`;
