import Image from 'next/image';
import Button from './button';

const SignedOutRewardsTiles = () => {
  // Define the image dimensions. Adjust these values based on the actual image size.
  const imageWidth = 800; // Example width in pixels
  const imageHeight = 600; // Example height in pixels

  return (
    <div className="relative pt-[200px] pl-[100px] pr-[100px]">
      <Image
        src="/SIGNED OUT REWARDS TILE.png"
        alt="Rewards Tiles"
        width={imageWidth}
        height={imageHeight}
        layout="responsive"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center pt-[100px]">
        <Button />
        <p className="text-white text-lg mb-4">To start claiming Rewards</p>
      </div>
    </div>
  );
};

export default SignedOutRewardsTiles;
