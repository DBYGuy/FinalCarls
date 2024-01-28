import React from 'react';

interface TraitProps {
  value: string;
  onSelect: () => void;
}

const Trait: React.FC<TraitProps> = ({ value, onSelect }) => {
  return (
    <footer
      className="w-full relative flex flex-row items-start justify-start gap-[13px] text-left text-base text-white-gold-itsc font-paragraph"
      onClick={onSelect}
    >
      <div className="h-[18px] w-[18px] relative box-border border-[1px] border-solid border-white-gold-itsc" />
      <div className="flex-1 relative tracking-[0.5px] leading-[18px] font-light">
        {value}
      </div>
    </footer>
  );
};

export default Trait;
