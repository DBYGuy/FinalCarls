import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '~/utils/trpc';
import { useMe } from '~/hooks/useMe';
import { useEditProfileModal } from '~/context/EditProfileModalContext';
import { useAvatarModal } from '~/context/AvatarModalContext';
import { usePopup } from '../PopUp/popupContext';
import NftModal from '../NftModal';
import { useTigerNfts } from '~/hooks/useTigerNfts';
import { NftProps } from '~/hooks/useTigerNfts';
import { useGetAvatar } from '~/hooks/useGetAvatar';

// Define the types for the form fields
type EditProfileFormData = {
  displayName?: string;
  username?: string;
  location?: string;
  bio?: string;
  Xhandle?: string;
  avatar?: string;
};

export const EditProfileModal: React.FC = () => {
  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileFormData>();
  const { user } = useMe();
  const utils = trpc.useContext();
  const { showPopup } = usePopup();
  const { closeModal } = useEditProfileModal();
  const { showAvatarModal } = useAvatarModal();
  const { avatarUrl } = useGetAvatar();
  const avatarToConfirm = avatarUrl ?? '';

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
    };

    // Call the update user profile mutation
    updateUser(userData);
    updateProfile(userProfileData);
    utils.profile.getUserProfile.invalidate();
    showPopup(
      'Congratulations!',
      `You have successfully updated your profile!`,
      avatarToConfirm,
    );
    closeModal();
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = await reverseGeocode(latitude, longitude);
          setValue(
            'location',
            location || `Lat: ${latitude}, Long: ${longitude}`,
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location.');
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by your browser.');
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();
      return `${data.address.state}, ${data.address.country}`;
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      return '';
    }
  };

  const nfts = useTigerNfts(); // Fetch NFTs
  const [selectedNft, setSelectedNft] = useState<NftProps | null>(null);
  const [isNftModalOpen, setIsNftModalOpen] = useState(false);

  const handleNftSelect = (nft: NftProps) => {
    setSelectedNft(nft);
    setValue('avatar', nft.src);
    setIsNftModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal} // Clicking on the overlay can also close the modal
      ></div>

      {/* Modal container */}
      <div className="relative bg-itsc-black rounded w-[360px] h-[441px] p-8 text-white overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-20 flex-col items-start justify-start gap-4"
        >
          {/* Input fields for user profile */}
          <input
            className="rounded bg-white p-2 border border-gray-200 w-[275px]"
            placeholder="Username"
            {...register('username')}
          />
          <div className="flex items-center gap-1">
            <input
              className="rounded bg-white p-2 border border-gray-200 w-[230px]"
              placeholder="Region or Country"
              {...register('location')}
            />
            <button
              type="button"
              className="flex items-center justify-center p-2 bg-transparent"
              onClick={handleGeolocation}
            >
              <img
                src="/locator.svg"
                alt="Use Current Location"
                className="w-10 h-10"
              />
            </button>
          </div>
          <input
            className="rounded bg-white p-2 border border-gray-200 w-[275px]"
            placeholder="X Handle"
            {...register('Xhandle')}
          />
          <textarea
            className="rounded bg-white p-2 border border-gray-200 w-[275px]"
            placeholder="Bio"
            {...register('bio')}
          />
          <div className="flex items-center gap-4">
            {/* Save Profile Button */}
            <button
              type="submit"
              className="flex items-center rounded text-white py-2 px-4 bg-transparent border border-white hover:bg-white hover:text-black transition duration-300"
            >
              Save Profile
            </button>

            {/* Select Avatar from NFTs Button */}
            <button
              type="button"
              className="flex items-center rounded text-white py-2 px-4 bg-transparent border border-white hover:bg-white hover:text-black transition duration-300"
              onClick={showAvatarModal}
            >
              <img
                src="/isolation-mode.svg"
                alt="Select Avatar"
                className="w-5 h-5 mr-2"
              />
              Select Avatar
            </button>
          </div>
        </form>
        <NftModal
          isOpen={isNftModalOpen}
          onClose={() => setIsNftModalOpen(false)}
          onSelect={handleNftSelect}
          nfts={nfts ?? []}
          selectedNft={selectedNft}
        />
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
