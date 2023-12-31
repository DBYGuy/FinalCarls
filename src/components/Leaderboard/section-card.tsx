import type { NextPage } from "next";
import FrameComponent from "./frame-component";

type SectionCardType = {
  avatarBaseImageUrl?: string;
};

const SectionCard: NextPage<SectionCardType> = ({ avatarBaseImageUrl }) => {
  return (
    <div className="w-[1205px] flex flex-col items-start justify-start">
      <FrameComponent
        privateAvatarBase="/-privateavatarbase@2x.png"
        frameDivPosition="relative"
      />
    </div>
  );
};

export default SectionCard;
