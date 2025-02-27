import { useState } from "react";
import styled from "styled-components";
import Timer from "../components/Timer";
import Stopwatch from "../components/Stopwatch";

const Home = () => {
  const [showTimer, setShowTimer] = useState(true);

  const toggleModule = () => {
    setShowTimer(!showTimer);
  };

  return (
    <CardContainer>
      <Card
        style={{ transform: showTimer ? "rotateY(0deg)" : "rotateY(180deg)" }}
      >
        <TimerFace>
          <Timer onTitleClick={toggleModule} />
        </TimerFace>
        <StopwatchFace>
          <Stopwatch onTitleClick={toggleModule} />
        </StopwatchFace>
      </Card>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  perspective: 1000px;
`;

const Card = styled.div`
  width: 300px;
  height: 200px;
  margin: 50px auto;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
`;

const CardFace = styled.div`
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const TimerFace = styled(CardFace)`
  transform: rotateY(0deg);
`;

const StopwatchFace = styled(CardFace)`
  transform: rotateY(180deg);
`;

export default Home;
