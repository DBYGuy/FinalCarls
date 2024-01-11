import type { NextPage } from 'next';
import { useMe } from '~/hooks/useMe';
import { useLevelUp } from '~/hooks/useLevelUp';
import { useConfirmationModal } from '~/context/ConfirmationModalContext';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import { usePopup } from '~/components/PopUp/popupContext'; // Import usePopup hook
import { useGetLevel } from '~/hooks/useGetLevel'; // Import useGetLevel hook

const LevelButton: NextPage = () => {
  const user = useMe();
  const { levelUp } = useLevelUp();
  const { showConfirmation } = useConfirmationModal();
  const { showPopup } = usePopup(); // Use the usePopup hook
  const { level } = useGetLevel(); // Get the current level
  const userId = user?.id ?? '';
  const { nextLevelPoints } = useCheckLevelEligibility(userId);

  const handleLevelUp = async () => {
    const confirmLevelUp = async () => {
      if (user?.id && level) {
        try {
          await levelUp(userId);
          // Show popup on successful level up
          showPopup(
            'Congratulations!',
            `You've reached level ${level + 1}!`, // Assuming level is the current level
            level + 1,
          );
        } catch (error) {
          console.error('Failed to level up:', error);
        }
      }
    };

    showConfirmation(
      `Are you sure you want to spend ${nextLevelPoints} points on the next level?`,
      confirmLevelUp,
    );
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md w-auto h-10 flex items-center justify-center">
      <button
        className="text-black bg-gradient from-rgb(180 83 9 / 0) via-rgb(253 186 116 / 0), to-rgb(159 18 57 / 0) font-semibold py-2 px-4 w-full h-full text-sm leading-none tracking-wide uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={handleLevelUp}
      >
        Level Up!
      </button>
    </div>
  );
};

export default LevelButton;
