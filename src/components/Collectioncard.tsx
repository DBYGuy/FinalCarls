import type { NextPage } from 'next';
import { useMemo, type CSSProperties } from 'react';

type CollectioncardType = {
  cardimage?: string;
  tagLabel?: string;
  collectionname?: string;
  artistnames?: string;
  tag?: boolean;
  tag1?: boolean;

  /** Style props */
  propPadding?: CSSProperties['padding'];
  propFlex?: CSSProperties['flex'];
  propFlex1?: CSSProperties['flex'];
};

const Collectioncard: NextPage<CollectioncardType> = ({
  cardimage,
  tagLabel,
  collectionname,
  artistnames,
  tag,
  tag1,
  propPadding,
  propFlex,
  propFlex1,
}) => {
  const tAGSStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const tagStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  const tag1Style: CSSProperties = useMemo(() => {
    return {
      flex: propFlex1,
    };
  }, [propFlex1]);

  return (
    <div className="self-stretch w-[239px] shrink-0 flex flex-col items-center justify-start pt-[17px] pb-2.5 pr-[15px] pl-3.5 box-border relative gap-[18px] text-left text-xs text-gray font-text-md-lineheight-6-font-semibold">
      <div className="w-full h-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-lg [background:linear-gradient(180deg,_#424242,_#262626)] shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)]" />
      <div className="self-stretch flex-1 relative rounded-lg z-[1] flex items-center justify-center">
        <img
          className="self-stretch flex-1 max-w-full overflow-hidden max-h-full z-[1] object-contain absolute left-[2px] top-[9px] w-full h-full [transform:scale(1.104)]"
          loading="eager"
          alt=""
          src={cardimage}
        />
      </div>
      <div className="self-stretch flex flex-col items-start justify-start py-0 px-px gap-[7px] z-[1]">
        <div
          className="self-stretch h-5 flex flex-row items-start justify-start gap-[8px]"
          style={tAGSStyle}
        >
          <div className="self-stretch rounded-md bg-carl-frost-white flex flex-row items-center justify-start py-0 px-2 gap-[6px]">
            <div className="relative leading-[16px] font-medium">Art</div>
            <div className="h-5 rounded-980xl hidden flex-row items-center justify-center">
              <img className="h-2.5 w-2.5 relative" alt="" src="/icon.svg" />
            </div>
          </div>
          {!tag && (
            <div
              className="self-stretch rounded-md bg-carl-frost-white hidden flex-row items-center justify-start py-0 px-2 gap-[6px]"
              style={tagStyle}
            >
              <div className="relative leading-[16px] font-medium">
                Animation
              </div>
              <div className="h-5 rounded-980xl hidden flex-row items-center justify-center">
                <img className="h-2.5 w-2.5 relative" alt="" src="/icon.svg" />
              </div>
            </div>
          )}
          {!tag1 && (
            <div
              className="self-stretch rounded-md bg-carl-frost-white hidden flex-row items-center justify-start py-0 px-2 gap-[6px]"
              style={tag1Style}
            >
              <div className="relative leading-[16px] font-medium">
                {tagLabel}
              </div>
              <div className="h-5 rounded-980xl hidden flex-row items-center justify-center">
                <img className="h-2.5 w-2.5 relative" alt="" src="/icon.svg" />
              </div>
            </div>
          )}
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-mini text-white font-chivo">
          <div className="self-stretch relative leading-[18px] [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)]">
            {collectionname}
          </div>
          <b className="w-[54.9px] relative text-3xs leading-[12px] flex items-center [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)]">
            ARTISTS:
          </b>
          <div className="w-[203px] relative text-sm leading-[18px] font-light flex items-center overflow-hidden text-ellipsis whitespace-nowrap [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)]">
            {artistnames}
          </div>
        </div>
        <div className="w-[178.4px] h-10 flex flex-row items-start justify-start gap-[6px]">
          <img
            className="h-10 w-[41px] relative overflow-hidden shrink-0 min-h-[40px]"
            loading="eager"
            alt=""
            src="/os-link.svg"
          />
          <button className="cursor-pointer [border:none] py-0 px-4 bg-purple-500 self-stretch flex-1 rounded-md flex flex-row items-center justify-center gap-[8px]">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
              alt=""
              src="/lefticon.svg"
            />
            <div className="relative text-base leading-[24px] font-semibold font-text-md-lineheight-6-font-semibold text-carl-frost-white text-left whitespace-nowrap">
              Learn More
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
              alt=""
              src="/lefticon.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collectioncard;
