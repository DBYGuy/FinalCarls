import type { NextPage } from 'next';
import { useMemo, type CSSProperties } from 'react';

type StuarMansonType = {
  /** Style props */
  stuarMansonPosition?: CSSProperties['position'];
  stuarMansonTop?: CSSProperties['top'];
  stuarMansonLeft?: CSSProperties['left'];
};

const StuarManson: NextPage<StuarMansonType> = ({
  stuarMansonPosition,
  stuarMansonTop,
  stuarMansonLeft,
}) => {
  const stuarMansonStyle: CSSProperties = useMemo(() => {
    return {
      position: stuarMansonPosition,
      top: stuarMansonTop,
      left: stuarMansonLeft,
    };
  }, [stuarMansonPosition, stuarMansonTop, stuarMansonLeft]);

  return (
    <div
      className="w-[411px] h-[42px] text-left text-17xl text-white-gold-itsc font-roboto"
      style={stuarMansonStyle}
    >
      <b className="absolute w-full top-[0%] left-[0%] inline-block">
        Stuar Manson
      </b>
    </div>
  );
};

export default StuarManson;
