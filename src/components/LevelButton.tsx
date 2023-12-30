import type { NextPage } from 'next';
import { useMe } from '~/hooks/useMe';
import { useLevelUp } from '~/hooks/useLevelUp';
import { useConfirmationModal } from '~/context/ConfirmationModalContext';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import { useGetPoints } from '~/hooks/useGetPoints';

const LevelButton: NextPage = () => {
  const user = useMe();
  const { levelUp } = useLevelUp();
  const { showConfirmation } = useConfirmationModal();
  const userId = user?.id ?? '';
  const { points = 0 } = useGetPoints(); // Assuming this returns the user's current points
  const { isEligible, toNextLevel = 0 } = useCheckLevelEligibility(userId); // Assuming this returns eligibility and points to next level

  const handleLevelUp = async () => {
    // Define the confirmation action
    const confirmLevelUp = async () => {
      if (user?.id) {
        try {
          await levelUp(userId); // Call the level up function with the user's ID
          // Handle success, e.g., close modal, show a success message, or update UI
        } catch (error) {
          console.error('Failed to level up:', error);
          // Handle error, e.g., close modal, show an error message
        }
      }
    };

    // Calculate points required for next level
    const pointsRequiredForNextLevel = Math.max(toNextLevel + points);

    // Show the confirmation modal
    showConfirmation(
      `Are you sure you want to spend ${pointsRequiredForNextLevel} points on the next level?`,
      confirmLevelUp,
    );
  };

  return (
    <div className="relative rounded-[34px] [background:linear-gradient(180deg,_#efd891,_#ede2b2)] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] w-full h-10 flex flex-row items-center justify-start py-2 px-4 box-border left-[200px] text-left text-base text-black font-bold w-[111.1px]">
      <button
        className="relative tracking-[0.6px] leading-[20px]"
        onClick={handleLevelUp}
      >
        Level Up!
      </button>
    </div>
  );
};

export default LevelButton;
