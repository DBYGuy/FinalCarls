import type { NextPage } from 'next';
import Header from '../components/Header';
import CarlCard from '../components/CarlCard';
import Collectioncard from '../components/Collectioncard';
import HODLCardDisconnected from '../components/HODLCardDisconnected';
import CommunityMembershipContainer from '../components/CommunityMembershipContainer';

const IndexPage: NextPage = () => {
  return (
    <div className="w-full relative overflow-hidden flex flex-col items-start justify-start pt-px px-0 pb-[67px] box-border gap-[11px] bg-cover bg-no-repeat bg-[top] tracking-[normal]">
      <section className="self-stretch h-[133px] flex flex-row items-start justify-start pt-0 px-0 pb-3 box-border max-w-full">
        <Header />
      </section>
      <section className="self-stretch flex flex-col items-center justify-start max-w-full shrink-0 text-center text-29xl text-white font-uniform">
        <CarlCard />
        <div className="self-stretch flex flex-col items-center justify-start pt-[124px] px-5 pb-[177px] box-border relative gap-[54px] max-w-full mq750:gap-[27px] mq1050:pt-[81px] mq1050:pb-[115px] mq1050:box-border mq450:pt-[53px] mq450:pb-[75px] mq450:box-border">
          <img
            className="w-[1578px] absolute my-0 mx-[!important] h-[calc(100%_-_0.5px)] top-[0px] right-[-92px] bottom-[0.5px] max-h-full object-cover"
            alt=""
            src="/collections-background@2x.png"
          />
          <h1 className="m-0 w-[487px] h-[37px] relative text-inherit leading-[50px] font-normal font-inherit flex items-center justify-center shrink-0 [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)] max-w-full z-[1] mq1050:text-19xl mq1050:leading-[40px] mq450:text-10xl mq450:leading-[30px]">
            CCC Releases
          </h1>
          <div className="w-[1120px] h-[376px] overflow-x-auto shrink-0 flex flex-row items-start justify-start py-0 pr-0.5 pl-0 box-border gap-[54px] max-w-full z-[1] mq750:gap-[27px]">
            <Collectioncard
              cardimage="/cardimage@2x.png"
              tagLabel="Music"
              collectionname="Crazy Carl Collective Genesis"
              artistnames="Myth Division, Jasti, Odious"
              tag={false}
              tag1={false}
            />
            <Collectioncard
              cardimage="/cardimage-1@2x.png"
              tagLabel="PFP/Avatar"
              collectionname="CRYPTO TATS"
              artistnames="NOMOZ"
              tag
              tag1
              propPadding="0px 4px 0px 0px"
              propFlex="1"
              propFlex1="1"
            />
            <Collectioncard
              cardimage="/cardimage-2@2x.png"
              tagLabel="Music"
              collectionname="Crazy Carl Cards"
              artistnames="Fintist"
              tag
              tag1={false}
              propPadding="unset"
              propFlex="unset"
              propFlex1="unset"
            />
            <Collectioncard
              cardimage="/cardimage-3@2x.png"
              tagLabel="Music"
              collectionname="CCC Records"
              artistnames="Terra Naomi, The Blocktunes, Ge..."
              tag={false}
              tag1
              propPadding="unset"
              propFlex="unset"
              propFlex1="unset"
            />
          </div>
        </div>
      </section>
      <section className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[55px] box-border max-w-full shrink-0 text-left text-45xl text-carl-frost-white font-uniform mq1050:pb-9 mq1050:box-border mq450:pb-[23px] mq450:box-border">
        <div className="flex-1 flex flex-col items-center justify-start p-[18px] box-border relative gap-[16px] min-h-[791px] max-w-full">
          <img
            className="w-[calc(100%_-_18.6px)] absolute my-0 mx-[!important] h-full top-[0px] right-[10.7px] bottom-[0px] left-[7.9px] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/hodl-section-bg.svg"
          />
          <div className="w-[1160px] flex flex-row items-start justify-start py-0 pr-[59px] pl-5 box-border max-w-full mq1125:pr-[29px] mq1125:box-border">
            <div className="flex-1 flex flex-row items-start justify-start gap-[13px] max-w-full mq1050:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[464px] max-w-full mq750:min-w-full">
                <h1 className="m-0 w-[379px] h-[75px] relative text-inherit font-normal font-inherit inline-block [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)] max-w-full z-[1] mq1050:text-32xl mq450:text-19xl">{`HODL `}</h1>
                <h1 className="m-0 w-[379px] h-[75px] relative text-inherit font-normal font-inherit inline-block [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)] max-w-full z-[1] mq1050:text-32xl mq450:text-19xl">{`to Stack `}</h1>
                <h1 className="m-0 self-stretch relative text-[96px] font-normal font-inherit [filter:drop-shadow(5px_6px_4px_rgba(0,_0,_0,_0.25))] z-[1] mq1050:text-29xl mq450:text-10xl">
                  <span>✨Carl Points</span>
                  <span className="text-light-purp-carl">✨</span>
                </h1>
                <div className="relative text-base font-coda inline-block [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)] max-w-full z-[1]">
                  <p className="m-0">{`Earn Carl Points for every day you hold CCC assets. `}</p>
                  <p className="m-0">
                    Redeem Carl Points or burn CCC Genesis tokens for Crazy Carl
                    Cards, a tokenized art collection by Fintist
                  </p>
                </div>
              </div>
              <img
                className="w-[354px] relative max-h-full object-contain max-w-full z-[1] mq1050:flex-1"
                loading="eager"
                alt=""
                src="/redeem-illustration@2x.png"
              />
            </div>
          </div>
          <div className="w-[1160px] h-[353px] overflow-x-auto shrink-0 flex flex-row items-start justify-start py-2 pr-11 pl-5 box-border gap-[24px] max-w-full z-[1] text-center text-[25.3px] text-lightgray font-archivo-black mq1125:pr-[22px] mq1125:box-border">
            <HODLCardDisconnected
              pointValue="44 points"
              framehodlcards="/rectangle-5@2x.png"
            />
            <HODLCardDisconnected
              pointValue="111 points"
              framehodlcards="/rectangle-5-1@2x.png"
            />
            <HODLCardDisconnected
              pointValue="444 points"
              framehodlcards="/rectangle-5-2@2x.png"
            />
            <HODLCardDisconnected
              pointValue="1111 points"
              framehodlcards="/rectangle-5-3@2x.png"
            />
            <div className="self-stretch w-[200px] shadow-[2.1px_9.5px_10.53px_rgba(0,_0,_0,_0.25)] shrink-0 flex flex-col items-start justify-start">
              <div className="self-stretch flex-1 relative rounded-lg [background:linear-gradient(180deg,_#424242,_#262626)] shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)]" />
              <div className="self-stretch flex-[0.9315] flex flex-col items-center justify-start pt-[11px] px-[7px] pb-3 gap-[8px] z-[1] mt-[-336px]">
                <div className="w-[175px] h-[18.3px] relative flex items-center justify-center shrink-0 [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)] mq450:text-[20px]">
                  🔥 👑
                </div>
                <img
                  className="self-stretch flex-1 relative rounded-lg max-w-full overflow-hidden max-h-full object-cover"
                  alt=""
                  src="/rectangle-5-4@2x.png"
                />
                <button className="cursor-pointer [border:none] pt-2 pb-[7px] pr-3 pl-4 bg-purple-500 h-10 rounded-md flex flex-row items-center justify-center box-border gap-[8px]">
                  <img
                    className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/lefticon.svg"
                  />
                  <div className="relative text-base leading-[24px] font-semibold font-text-md-lineheight-6-font-semibold text-carl-frost-white text-left">
                    Sign in to Claim
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
        </div>
      </section>
      <img
        className="self-stretch relative max-w-full overflow-hidden max-h-full object-cover shrink-0"
        alt=""
        src="/seize@2x.png"
      />
      <section className="self-stretch flex flex-col items-start justify-start shrink-0 text-center text-5xl text-white font-uniform">
        <div className="self-stretch flex flex-row flex-wrap items-start justify-center py-12 px-5 gap-[16px] mq1050:justify-center">
          <CommunityMembershipContainer
            httpsapplottiefilescomani="/httpsapplottiefilescomanimation952e961ace5c49f6bf610d51848e287a@2x.png"
            community="Community"
            membership="Membership"
            joinTheCCCAndReceiveFullA="Join the CCC and receive full access to the community of builders, artists, collectors, and traders on Discord and X."
          />
          <div className="flex-1 bg-darkslateblue flex flex-col items-center justify-start p-2 box-border gap-[8px] min-w-[202px] max-w-[268px]">
            <img
              className="w-[51px] h-[51px] relative overflow-hidden shrink-0 object-contain"
              loading="eager"
              alt=""
              src="/httpsapplottiefilescomanimationb58f6bd85b4741ad8f6aa7f315ce42d3@2x.png"
            />
            <h3 className="m-0 self-stretch h-14 relative text-inherit font-normal font-inherit inline-block mq450:text-lgi">
              <p className="m-0">{`HODL `}</p>
              <p className="m-0">CCC NFTS</p>
            </h3>
            <div className="self-stretch h-[92px] relative text-base font-coda whitespace-pre-wrap inline-block">
              <p className="m-0">3 points/day for Genesis.</p>
              <p className="m-0">
                2 point/day for Crypto Tats. Redeem points for Crazy Carl Cards.
              </p>
            </div>
          </div>
          <CommunityMembershipContainer
            httpsapplottiefilescomani="/httpsapplottiefilescomanimation81f54e4c1d5b4ee6b9eec707a053920f@2x.png"
            community="Seize"
            membership="The Carls"
            joinTheCCCAndReceiveFullA="Trade Crazy Carl Cards for opportunities to seize amazing artwork from our community artists."
          />
          <div className="flex-1 bg-darkslateblue flex flex-col items-center justify-start pt-2 px-2 pb-[9px] box-border gap-[8px] min-w-[202px] max-w-[268px]">
            <img
              className="w-[51px] h-[50px] relative overflow-hidden shrink-0 object-contain"
              loading="eager"
              alt=""
              src="/httpsapplottiefilescomanimation8588915a295c4f3cbce344e57d6266b5@2x.png"
            />
            <h3 className="m-0 self-stretch relative text-inherit font-normal font-inherit mq450:text-lgi">
              Community Governance
            </h3>
            <div className="self-stretch h-[92px] relative text-base font-coda whitespace-pre-wrap inline-block">
              The CCC community treasury is governed by 20 CCC NFT Holders (The
              Carl Council) with community imput
            </div>
          </div>
        </div>
        <footer className="self-stretch flex flex-col items-center justify-start py-12 px-2 gap-[24px] text-center text-base text-white font-coda">
          <div className="flex flex-row items-start justify-start py-0 px-5 gap-[20px]">
            <img
              className="h-[75.6px] w-[75.6px] relative rounded-[15.75px] min-h-[76px]"
              loading="eager"
              alt=""
              src="/social-icons--discord.svg"
            />
            <img
              className="h-[75.6px] w-[75.6px] relative rounded-[15.75px] overflow-hidden shrink-0 min-h-[76px]"
              loading="eager"
              alt=""
              src="/x-logo.svg"
            />
          </div>
          <div className="self-stretch h-[92px] relative whitespace-pre-wrap inline-block">
            <p className="m-0">
              WUTJU! Got more questions or ideas? Hop in the Discord or hit us
              up on 𝕏X.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0">
              This site was created by Carls, for Carls, rights reserved, 2023
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default IndexPage;
