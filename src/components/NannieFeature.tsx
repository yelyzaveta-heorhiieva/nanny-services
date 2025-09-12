

export interface NannieFeatureProps {
    feature: string;
    value: string | number;
}

export default function NannieFeature({feature, value}: NannieFeatureProps) {
  return (
    <li className='bg-[#f3f3f3] px-4 py-2 rounded-3xl font-medium text-base leading-[150%] text-[#8a8a89]'>
      {feature}
      <span className={`${feature === 'Age: ' && 'text-decoration-skip-none underline'} text-[#11101c] `}>
        {value}
      </span>
    </li>
  );
};
