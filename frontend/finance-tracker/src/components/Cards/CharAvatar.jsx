import React from 'react';
import { getInitials } from '../../utils/helper';

// give each avatar a random (but consistent) background color based on the user's name
const colors = [
  'bg-red-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-yellow-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-indigo-400',
  'bg-emerald-400',
];

// Hash function to pick a color based on the name
const getColorFromName = (name) => {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return colors[sum % colors.length];
};

const CharAvatar = ({ fullName, width, height, style }) => {
  const initials = getInitials(fullName || '');
  const bgColor = getColorFromName(fullName || '');

  return (
    <div
      className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} ${bgColor} text-white flex items-center justify-center rounded-full font-semibold`}
    >
      {initials}
    </div>
  );
};

export default CharAvatar;
