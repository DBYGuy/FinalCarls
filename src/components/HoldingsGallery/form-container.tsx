import type { NextPage } from 'next';

type FormContainerType = {
  cardTitle?: string;
  buttonText?: string;
  tigerNumber?: string;
  details1?: string;
  href?: string;
};

const FormContainer: NextPage<FormContainerType> = ({
  cardTitle,
  buttonText,
  tigerNumber,
  details1,
  href,
}) => {
  return (
    <div className="relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-[300px] h-[400px] text-left text-5xl text-white font-outfit">
      <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded bg-itsc-black shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset] box-border border-[7px] border-solid border-linear" />
      <div className="absolute top-[28px] left-[calc(50%_-_125px)] flex flex-col items-start justify-end gap-[8px]">
        <img
          className="relative rounded-3xs w-[250px] h-[250px] object-cover"
          alt=""
          src={cardTitle}
        />
        <div className="shrink-0 flex flex-col items-start justify-end">
          <div className="relative tracking-[-0.01em] leading-[3px] flex items-center w-[250px] h-7">
            ITSC # {tigerNumber}
          </div>
          <div className="relative text-base tracking-[-0.01em] font-light flex items-center w-[106px] h-7 mt-[-6px]">
            {details1}
          </div>
        </div>
      </div>
      <button
        className="absolute bottom-[20px] left-[calc(50%_-_70px)] rounded-3xl bg-gradient-to-r from-gold-start to-gold-end h-10 flex items-center justify-center py-2 px-4 box-border text-black font-bold tracking-[0.6px] leading-[20px]"
        onClick={() => window.open(href, '_blank')}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FormContainer;
