import * as icons from 'lucide-react';

interface Props {
  iconName: string;
  onClick: () => void;
}

const IconButton = ({ iconName, onClick }: Props) => {
  const LucideIcon = icons[iconName as keyof typeof icons];

  return (
    <button type="button" onClick={onClick} className="focus:outline-none">
      <LucideIcon className="w-5 sm:w-9" size="100%" />
    </button>
  );
};

export default IconButton;
