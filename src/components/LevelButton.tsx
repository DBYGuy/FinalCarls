import type { NextPage } from 'next';
import { useMe } from '~/hooks/useMe';
import { useLevelUp } from '~/hooks/useLevelUp';
import { useConfirmationModal } from '~/context/ConfirmationModalContext';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import { usePopup } from '~/components/PopUp/popupContext'; // Import usePopup hook
import { useGetLevel } from '~/hooks/useGetLevel'; // Import useGetLevel hook

const LevelButton: NextPage = () => {
  const { user, isLoading } = useMe();
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
    <div className="relative rounded-lg overflow-hidden shadow-md w-auto mx-1 h-10 flex items-right justify-right">
      <button
        className="text-black bg-gradient-to-r from-orange-600 via-yellow-300 to-red-600 font-bold py-2 px-4 w-full h-full text-[16px] leading-[2px]tracking-wide uppercase focus:outline-none focus:ring-0 animate-gradientShift"
        onClick={handleLevelUp}
      >
        Level Up!
      </button>
    </div>
  );
};

export default LevelButton;
