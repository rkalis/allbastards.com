interface Props {
  to: string;
  text: string;
  inverted?: boolean;
  className?: string;
}

function Link({ to, text, inverted, className }: Props) {
  const regularColours = 'text-blue-500 hover:text-red-500';
  const invertedColours = 'text-red-500 hover:text-blue-500';

  return (
    <a className={`${inverted ? invertedColours : regularColours} ${className}`} href={to}>{text}</a>
  );
}

export default Link;
