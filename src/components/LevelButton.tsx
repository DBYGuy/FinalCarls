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
  const { toNextLevel = 0 } = useCheckLevelEligibility(userId); // Assuming this returns eligibility and points to next level

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
    <div className="relative rounded-lg overflow-hidden shadow-md w-auto h-10 flex items-center justify-center">
      <button
        style={{
          background:
            'radial-gradient(conic top right, rgb(180, 83, 9), rgb(253, 186, 116), rgb(159, 18, 57))',
        }}
        className="animate-gradient-xy text-black font-semibold py-2 px-4 w-full h-full text-sm leading-none tracking-wide uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={handleLevelUp}
      >
        Level Up!
      </button>
    </div>
  );
};

export default LevelButton;
