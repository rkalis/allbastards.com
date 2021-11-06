import { Metadata } from '../../utils/interfaces';

interface Props {
  metadata: Metadata;
}

function Description({ metadata }: Props) {
  const wordCount = metadata.description.trim().split(/[\s\n]+/).length;

  return (
    <div className="w-1/2 max-w-md mx-auto flex flex-col justify-center text-center text-sm md:text-base">
      <div>{metadata.description}</div>
      <div>(word count: {wordCount})</div>
    </div>
  );
}

export default Description;
