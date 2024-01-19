import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TimerCountDown from './components/TimerCountDown';
import secondsToTime from './utils/secondsToTime';
import ControlButton from './components/ControlButton';

interface Props {
  pomodoroTime: number;
  shortRestingTime: number;
  longRestingTime: number;
  numberOfCycles: number;
}

type PomodoroState = {
  initialState?: boolean;
  isPaused: boolean;
  isWorking: boolean;
  isResting: boolean;
};

export default function App(props: Props) {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [cycles, setCycles] = useState(0);
  const [workingTime, setWorkingTime] = useState(0);
  const [timeBlocks, setTimeBlocks] = useState(0);
  const [numberOfCycles, setNumberOfCycles] = useState(
    new Array(props.numberOfCycles).fill(0),
  );
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>({
    initialState: true,
    isPaused: false,
    isResting: false,
    isWorking: false,
  });

  const setRestingMode = useCallback(
    (isShortTime: boolean) => {
      if (isShortTime) {
        setMainTime(props.shortRestingTime);
      } else {
        setMainTime(props.longRestingTime);
      }

      setPomodoroState({ isPaused: false, isResting: true, isWorking: false });
    },
    [props.longRestingTime, props.shortRestingTime],
  );

  const setWorkingMode = useCallback(() => {
    setMainTime(props.pomodoroTime);
    setPomodoroState({ isPaused: false, isResting: false, isWorking: true });
  }, [props.pomodoroTime]);

  useEffect(() => {
    setBackgroundColor(pomodoroState);

    if (pomodoroState.isPaused) return;

    if (!pomodoroState.isWorking && !pomodoroState.isResting) return;

    if (numberOfCycles.length == 0) {
      setCycles(cycles + 1);
      setRestingMode(false);
      setNumberOfCycles(new Array(props.numberOfCycles).fill(0));
    }

    const intervalId = setInterval(() => {
      setMainTime(mainTime - 1);

      if (pomodoroState.isWorking && mainTime > 0) {
        setWorkingTime(workingTime + 1);
      }

      if (pomodoroState.isWorking && mainTime == 0) {
        setRestingMode(true);
        setTimeBlocks(timeBlocks + 1);
        numberOfCycles.pop();
      }

      if (pomodoroState.isResting && mainTime == 0) {
        setWorkingMode();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    mainTime,
    pomodoroState,
    workingTime,
    timeBlocks,
    cycles,
    props.numberOfCycles,
    setRestingMode,
    setWorkingMode,
  ]);

  const handleWork = (): void => {
    setWorkingMode();
  };

  const handlePause = (): void => {
    const newPomodoroState = { ...pomodoroState };

    if (pomodoroState.isPaused) {
      newPomodoroState.isPaused = false;
      setPomodoroState(newPomodoroState);
    } else {
      newPomodoroState.isPaused = true;
      setPomodoroState(newPomodoroState);
    }
  };

  const handleRest = (): void => {
    setRestingMode(true);
  };

  const getTitle = (state: PomodoroState): string => {
    if (state.initialState) return 'stopped';
    if (state.isPaused) return 'paused';
    if (state.isResting) return 'resting';
    if (state.isWorking) return 'working';

    return '';
  };

  const setBackgroundColor = (state: PomodoroState): void => {
    if (state.isResting) {
      document.body.classList.add('resting');
      document.body.classList.remove('working');
      return;
    }

    if (state.isWorking) {
      document.body.classList.add('working');
      document.body.classList.remove('resting');
      return;
    }

    document.body.classList.remove('working');
    document.body.classList.remove('resting');
  };

  return (
    <>
      <div className="container">
        <h1>You are: {getTitle(pomodoroState)}</h1>

        <TimerCountDown className="timer" seconds={mainTime} />

        <div className="controls">
          <ControlButton onClick={handleWork} name="Work" />

          <ControlButton
            onClick={handlePause}
            name={pomodoroState.isPaused ? 'Play' : 'Pause'}
            className={pomodoroState.initialState ? 'hidden' : ''}
          />

          <ControlButton onClick={handleRest} name="Rest" />
        </div>

        <div className="details">
          <p>Details:</p>
          <p>Cycles: {cycles}</p>
          <p>Total working time: {secondsToTime(workingTime)}</p>
          <p>Time blocks (pomodoros): {timeBlocks}</p>
        </div>
      </div>
    </>
  );
}
