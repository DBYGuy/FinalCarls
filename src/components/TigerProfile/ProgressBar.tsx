interface ProgressBarProps {
  progressPercentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage }) => {
  return (
    <div className="w-full bg-itsc-white rounded-full h-3 mb-4 relative">
      <img
        src="/line-7@2x.png"
        alt="Progress Bar Background"
        className="absolute top-0 left-0 w-full h-full object-cover rounded-full z-6"
      />
      <div
        className="bg-dusty-red h-[100%] left-[-3px] rounded-full absolute z-8"
        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
