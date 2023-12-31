import type { NextPage } from "next";

type ContainerCardFormFilterType = {
  avatarBaseImageUrl?: string;
};

const ContainerCardFormFilter: NextPage<ContainerCardFormFilterType> = ({
  avatarBaseImageUrl,
}) => {
  return (
    <img
      className="absolute top-[0px] left-[134px] w-[72px] h-[72px] object-cover"
      alt=""
      src={avatarBaseImageUrl}
    />
  );
};

export default ContainerCardFormFilter;
