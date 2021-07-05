import { overrideTailwindClasses } from 'tailwind-override';

interface Props {
  label: string;
  onClick?: () => void;
  className?: string;
}

function Button({ label, onClick, className }: Props) {
  const fullClassName = overrideTailwindClasses(
    `border-2 border-black shadow-sm px-4 py-2 bg-blue-500 text-sm text-white font-charriot font-bold hover:bg-red-500 focus:outline-none ${className}`,
  );

  return (
    <button type="button" className={fullClassName} onClick={onClick}>{label}</button>
  );
}

export default Button;
