import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type Component1Type = {
  /** Style props */
  divPosition?: CSSProperties["position"];
  divTop?: CSSProperties["top"];
  divLeft?: CSSProperties["left"];
};

const Component1: NextPage<Component1Type> = ({
  divPosition,
  divTop,
  divLeft,
}) => {
  const div1Style: CSSProperties = useMemo(() => {
    return {
      position: divPosition,
      top: divTop,
      left: divLeft,
    };
  }, [divPosition, divTop, divLeft]);

  return (
    <div
      className="w-[113px] h-[42px] text-center text-17xl text-white-gold-itsc font-roboto"
      style={div1Style}
    >
      <b className="absolute w-full top-[0%] left-[0%] inline-block">80</b>
    </div>
  );
};

export default Component1;
