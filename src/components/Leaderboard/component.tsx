import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type ComponentType = {
  /** Style props */
  divPosition?: CSSProperties["position"];
  divTop?: CSSProperties["top"];
  divLeft?: CSSProperties["left"];
};

const Component: NextPage<ComponentType> = ({
  divPosition,
  divTop,
  divLeft,
}) => {
  const divStyle: CSSProperties = useMemo(() => {
    return {
      position: divPosition,
      top: divTop,
      left: divLeft,
    };
  }, [divPosition, divTop, divLeft]);

  return (
    <div
      className="w-[193px] h-[42px] text-right text-17xl text-white-gold-itsc font-roboto"
      style={divStyle}
    >
      <b className="absolute w-full top-[0%] left-[0%] inline-block">123456</b>
    </div>
  );
};

export default Component;
