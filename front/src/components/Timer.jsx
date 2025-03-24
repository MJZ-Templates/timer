import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import TimerList from "../components/TimerList";
import useTimerStore from "../store/timerStore";

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
      <Title onClick={onTitleClick}>⏳ Timer</Title>
      <Form onSubmit={handleSubmit}>
        <NumberContainer>
          <StyledInput
            type="number"
            value={padNumber(hours)}
            onChange={(e) => setHours(e.target.value)}
            min="0"
          />
          <StyledColon>:</StyledColon>
          <StyledInput
            type="number"
            value={padNumber(minutes)}
            onChange={(e) => setMinutes(e.target.value)}
            min="0"
          />
          <StyledColon>:</StyledColon>
          <StyledInput
            type="number"
            value={padNumber(seconds)}
            onChange={(e) => setSeconds(e.target.value)}
            min="0"
          />
          <AddButton type="submit">
            <FaPlus />
          </AddButton>
        </NumberContainer>
      </Form>
      <TimerList />
    </Container>
  );
};

Timer.propTypes = {
  onTitleClick: PropTypes.func.isRequired,
};

export default Timer;

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
  font-size: 2rem;
  cursor: pointer;
  color: #00FFAB;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 255, 171, 0.2);
`;

const StyledInput = styled.input`
  width: 60px;
  text-align: center;
  font-size: 2rem;
  font-family: 'Courier New', monospace;
  background: transparent;
  border: none;
  color: #00FFAB;
  outline: none;
`;

const StyledColon = styled.span`
  font-size: 2rem;
  padding: 0 10px;
  color: #ffffff;
`;

const AddButton = styled.button`
  background-color: #00FFAB;
  color: black;
  border: none;
  margin-left: 12px;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2effc2;
  }
`;