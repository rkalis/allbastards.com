import { overrideTailwindClasses } from 'tailwind-override';

interface Props {
  label: string;
  onClick?: () => void;
  inverted?: boolean;
  className?: string;
}

function Button({ label, onClick, inverted, className }: Props) {
  const regularColours = 'bg-blue-500 hover:bg-red-500';
  const invertedColours = 'bg-red-500 hover:bg-blue-500';

  const fullClassName = overrideTailwindClasses(
    `${inverted ? invertedColours : regularColours} border-2 border-black shadow-sm px-4 py-2 text-sm text-white font-charriot font-bold focus:outline-none ${className}`,
  );

  return (
    <button type="button" className={fullClassName} onClick={onClick}>{label}</button>
  );
}

export default Button;
