interface Props {
  className?: string;
  name: string;
  onClick: () => void;
}

export default function ControlButton(props: Props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.name}
    </button>
  );
}
