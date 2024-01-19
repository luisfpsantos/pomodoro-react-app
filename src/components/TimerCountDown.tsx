import secondsToTime from '../utils/secondsToTime';

interface Props {
  seconds: number;
  className?: string;
}

export default function TimerCountDown(props: Props) {
  return <p className={props.className}>{secondsToTime(props.seconds)}</p>;
}
