import { Metadata } from '../../utils/interfaces';
import Attribute from './Attribute';

interface Props {
  metadata: Metadata;
}

function Attributes({ metadata }: Props) {
  return (
    <div>
      <h3 className="font-bold text-center text-2xl md:text-3xl">ATTRIBUTES</h3>
      <div className="flex justify-center">
        <div className="w-5/6 flex flex-wrap justify-center gap-2">
          {metadata.attributes.map(({ trait_type, value }) => (
            <Attribute attribute={trait_type} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Attributes;
