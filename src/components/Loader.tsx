import { Circles } from 'react-loader-spinner';

export interface LoaderProps {}

export default function Loader({}: LoaderProps) {
  return (
    <div>
      <Circles
        height='60'
        width='60'
        color='#103931'
        ariaLabel='circles-loading'
        wrapperStyle={{}}
        wrapperClass='justify-center'
        visible={true}
      />
    </div>
  );
};
