interface TraitCategoryProps {
  traitType: string;
  traitCount: number;
  onClick: () => void;
  collapsed: boolean;
}

const TraitCategory: React.FC<TraitCategoryProps> = ({
  traitType,
  traitCount,
  onClick,
  collapsed,
}) => {
  return (
    <header
      className="w-full relative flex flex-row items-start justify-between text-right text-base text-white font-paragraph cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-row items-center justify-start py-0 px-0 gap-[12px]">
          <img
            className="h-3.5 w-[27.5px] relative object-contain hidden"
            alt=""
          />
          <img
            className={`h-3.5 w-[27.5px] relative object-contain ${
              collapsed ? 'rotate-180' : ''
            }`}
            loading="eager"
            alt=""
            src="/vector-361.svg"
          />
          <b className="relative tracking-[0.64px] leading-[21.26px] opacity-[0.55]">
            {traitCount}
          </b>
        </div>
      </div>
      <h3 className="m-0 relative text-[24px] tracking-[0.64px] leading-[21.26px] font-bold font-inherit text-white-gold-itsc text-left">
        {traitType}
      </h3>
    </header>
  );
};

export default TraitCategory;
