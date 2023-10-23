import { useEffect, useMemo, useState } from 'react';
import Buttons from './buttons';

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  const renderButtons = useMemo(
    () => (
      <Buttons
        handleStart={handleStart}
        handleStop={handleStop}
        isRunning={isRunning}
      />
    ),
    [isRunning],
  );

  return (
    <div className="stop-watch">
      {renderButtons}
      <div className="timer">
        <span className="digits">
          {('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:
        </span>
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
