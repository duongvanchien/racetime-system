import { useEffect, useMemo, useState } from 'react';
import Buttons from './buttons';

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const renderButtons = useMemo(
    () => <Buttons handleStart={handleStart} handleReset={handleReset} />,
    [],
  );

  return (
    <div className="stop-watch">
      {renderButtons}

      <div className="timer">
        <span className="digits">
          {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {('0' + Math.floor((time / 1000) % 60)).slice(-2)}:
        </span>
        <span className="digits mili-sec">
          {('0' + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
    </div>
  );
}

export default StopWatch;
