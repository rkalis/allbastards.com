import { CALM_ATTRIBUTES, HIGHEST_BASTARD_ID, HYPED_ATTRIBUTES } from '../../utils/constants';
import { getAttributeCount } from '../../utils/filters';
import { HypeType } from '../../utils/interfaces';

interface Props {
  attribute: string;
  value: string
}

function Attribute({ attribute, value }: Props) {
  const adjustedAttribute = attribute === 'BACKGROUND GLITCH LEVEL' ? 'BG GLITCH LEVEL' : attribute;
  const [adjustedValue] = value.split(' (');
  const attributeCount = getAttributeCount(attribute, value);
  const attributeRarity = attributeCount < 10
    ? `1 of ${attributeCount}`
    : `${((attributeCount / (HIGHEST_BASTARD_ID + 1)) * 100).toFixed(2)}%`;

  const hypeTypeFilter = CALM_ATTRIBUTES.includes(attribute)
    ? [HypeType.CALM]
    : HYPED_ATTRIBUTES.includes(attribute)
      ? [HypeType.HYPED]
      : undefined;

  const filter = {
    'HYPE TYPE': hypeTypeFilter,
    [attribute]: [value],
  };

  return (
    <a href={`/?filters=${JSON.stringify(filter)}`} >
      <div className="border-2 w-64 border-black p-2 flex flex-col justify-center">
        <h4 className="font-bold text-blue-500 text-center text-lg md:text-xl">
          {adjustedAttribute}
        </h4>
        <div className="text-center text-sm md:text-base">
          {adjustedValue}
        </div>
        <div className="text-center text-sm md:text-base">
          (<span className="text-red-500">{attributeRarity}</span>)
        </div>
      </div>
    </a>
  );
}

export default Attribute;
