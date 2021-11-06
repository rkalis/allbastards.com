interface Props {
  attribute: string;
  value: string
}

function Attribute({ attribute, value }: Props) {
  const adjustedAttribute = attribute === 'BACKGROUND GLITCH LEVEL' ? 'BG GLITCH LEVEL' : attribute;

  return (
    <div className="border-2 w-64 border-black p-2 flex flex-col justify-center">
      <h4 className="font-bold text-blue-500 text-center text-lg md:text-xl">
        {adjustedAttribute}
      </h4>
      <div className="text-center text-sm md:text-base">
        {value}
      </div>
    </div>
  );
}

export default Attribute;
