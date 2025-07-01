import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu'; 

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
      <div
        className='flex items-center gap-4 cursor-pointer' 
        onClick={() => setIsOpen(true)} //When clicked, it sets isOpen to true, opening the emoji picker
      >
        <div className='w-12 h-12 flex items-center justify-center text-2xl bg-blue-50 text-blue-500 rounded-lg'>
          {/* If icon exists, show it as an image.If not, show a generic image icon. */}
          {icon ? (
            <img src={icon} alt="emoji" className='w-12 h-12' />
          ) : (
            <LuImage />
          )}

        </div>

        <p>{icon ? "Change Icon" : "Pick Icon"}</p> {/* if there is already an icon show 1st text */}
      </div>

      {isOpen && (
        <div className='relative'>
          <button
            className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
            onClick={() => setIsOpen(false)} // close the picker
          >
            <LuX /> {/* close button */}
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
            /* Shows the actual emoji picker.open={isOpen} keeps it visible when open.onEmojiClick: when a user clicks an emoji, this function runs.
               emoji?.imageUrl || "": gets the selected emoji's image URL (or empty if unavailable).
               Then passes it to the onSelect function, which updates the parent state. */
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
