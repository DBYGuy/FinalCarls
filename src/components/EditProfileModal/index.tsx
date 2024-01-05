import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '~/utils/trpc';
import { useMe } from '~/hooks/useMe';
import { useEditProfileModal } from '~/context/EditProfileModalContext';
import { usePopup } from '../PopUp/popupContext';

// Define the types for the form fields
type EditProfileFormData = {
  displayName?: string;
  username?: string;
  location?: string;
  bio?: string;
  Xhandle?: string;
  discordID?: string;
};

export const EditProfileModal: React.FC = () => {
  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>();
  const user = useMe();
  const utils = trpc.useContext();
  const { showPopup } = usePopup();
  const { closeModal } = useEditProfileModal();

  // Setup tRPC mutation for updating user and profile
  const { mutate: updateUser, isLoading: isUpdatingUser } =
    trpc.users.update.useMutation();
  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    trpc.profile.update.useMutation();

  // Define what happens when the form is submitted
  const onSubmit = (data: EditProfileFormData) => {
    const userId = user?.id ?? '';

    // Prepare the data for each update function
    const userProfileData = {
      userId,
      location: data.location,
      bio: data.bio,
    };
    const userData = {
      userId,
      username: data.username,
      displayName: data.displayName,
      Xhandle: data.Xhandle,
      discordID: data.discordID,
    };

    // Call the update user profile mutation
    updateUser(userData);
    updateProfile(userProfileData);
    utils.profile.getUserProfile.invalidate()!;
    showPopup(
      'Congratulations!',
      `You have successfully updated your profile!`,
      '/scroll@2x.png',
    );
    closeModal();
  };

  return (
    // The outer container should be fixed to cover the entire screen
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay: semi-transparent backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal} // Clicking on the overlay can also close the modal
      ></div>

      {/* Modal container */}
      <div className="relative bg-itsc-black rounded w-[350px] h-[401px] p-8 text-white overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-20 flex-col items-start justify-start gap-4"
        >
          {/* Input fields for user profile */}
          <input
            className="rounded bg-white p-2 border border-gray-200 w-full"
            placeholder="Username"
            {...register('username')}
          />
          <input
            className="rounded bg-white p-2 border border-gray-200 w-full"
            placeholder="Region or Country"
            {...register('location')}
          />
          <input
            className="rounded bg-white p-2 border border-gray-200 w-full"
            placeholder="Discord Handle"
            {...register('discordID')}
          />
          <input
            className="rounded bg-white p-2 border border-gray-200 w-full"
            placeholder="X Handle"
            {...register('Xhandle')}
          />
          <textarea
            className="rounded bg-white p-2 border border-gray-200 w-full"
            placeholder="Bio"
            {...register('bio')}
          />
          {/* Save Button */}
          <button
            type="submit"
            // disabled={isLoading}
            className="rounded bg-blue-500 text-white py-2 px-4"
          >
            Save Profile
          </button>
        </form>
        <div className="absolute top-[21px] left-[21px] w-[271px] h-[50px] text-[40px] font-omegle">
          <div className="absolute top-[0px] left-[13px] tracking-[2.87px] leading-[40px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Edit Profile
          </div>
          <img
            className="absolute top-[50px] left-[13px] max-h-full w-[298px] object-cover"
            alt=""
            src="/line-7@2x.png"
          />
        </div>
        <button onClick={closeModal}>
          <img
            className="absolute top-[6px] left-[377px] w-[25px] h-[25px] object-cover"
            alt=""
            src="/close-button@2x.png"
          />
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
