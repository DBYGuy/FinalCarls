import React, { ReactNode } from 'react';

interface RectangleComponentProps {
  children: ReactNode;
}

const RectangleComponent: React.FC<RectangleComponentProps> = ({
  children,
}) => {
  return (
    <div className="w-full h-[95%] relative max-h-screen">
      <section className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-lg bg-itsc-black box-border border-t-[3px] border-solid border-linear border-b-[3px] border-r-[3px]">
        {children}
      </section>
    </div>
  );
};

export default RectangleComponent;
