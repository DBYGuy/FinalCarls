import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type Component2Type = {
  /** Style props */
  divPosition?: CSSProperties["position"];
  divTop?: CSSProperties["top"];
  divLeft?: CSSProperties["left"];
};

const Component2: NextPage<Component2Type> = ({
  divPosition,
  divTop,
  divLeft,
}) => {
  const div2Style: CSSProperties = useMemo(() => {
    return {
      position: divPosition,
      top: divTop,
      left: divLeft,
    };
  }, [divPosition, divTop, divLeft]);

  return (
    <div
      className="w-[126px] h-16 text-left text-45xl font-title"
      style={div2Style}
    >
      <div className="absolute w-full top-[0%] left-[0%] tracking-[3.4px] leading-[64px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">
        1
      </div>
    </div>
  );
};

export default Component2;
