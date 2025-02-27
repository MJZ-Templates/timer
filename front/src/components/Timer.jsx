import { useState } from "react";
import useTimerStore from "../store/timerStore";
import TimerList from "../components/TimerList";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const padNumber = (num) => String(num).padStart(2, "0");

const Timer = ({ onTitleClick }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const addTimer = useTimerStore((state) => state.addTimer);
  const timers = useTimerStore((state) => state.timers);

  const handleSubmit = (e) => {
    e.preventDefault();

    const h = Math.max(0, parseInt(hours, 10) || 0);
    const m = Math.max(0, parseInt(minutes, 10) || 0);
    const s = Math.max(0, parseInt(seconds, 10) || 0);

    if (h === 0 && m === 0 && s === 0) {
      alert("Please enter a valid time.");
      return;
    }

    const duration = h * 3600000 + m * 60000 + s * 1000;
    const timerName = `Timer ${timers.length + 1}`;

    addTimer({ name: timerName, duration });

    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <Container>
      <Title onClick={onTitleClick}>Timer</Title>
      <form onSubmit={handleSubmit}>
        <NumberContainer>
          <NumberInput
            type="number"
            placeholder="Hours"
            value={padNumber(hours)}
            onChange={(e) => setHours(e.target.value)}
            min="0"
          />
          <StyledText>:</StyledText>
          <NumberInput
            type="number"
            placeholder="Minutes"
            value={padNumber(minutes)}
            onChange={(e) => setMinutes(e.target.value)}
            min="0"
          />
          <StyledText>:</StyledText>
          <NumberInput
            type="number"
            placeholder="Seconds"
            value={padNumber(seconds)}
            onChange={(e) => setSeconds(e.target.value)}
            min="0"
          />
          <StyledButton type="submit">
            <FaPlus />
          </StyledButton>
        </NumberContainer>
      </form>
      <TimerList />
    </Container>
  );
};

const Title = styled.h1`
  cursor: pointer;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const NumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 30px;
`;

const NumberInput = styled.input`
  width: 50px;
  text-align: center;
  border: none;
  font-size: 30px;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StyledText = styled.div`
  padding-right: 10px;
`;

export default Timer;
