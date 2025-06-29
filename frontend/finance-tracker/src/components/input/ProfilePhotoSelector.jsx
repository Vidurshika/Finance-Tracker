import React, { useRef, useState } from 'react';
/* useRef is a special React hook that lets you point to an element in your HTML, like a file input or a button. */
/* import { LuUser, LuUpload, LuTrash } from "react-icons/lu"; fa or lu*/
import { FaUserAlt , FaTrashAlt} from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const ProfilePhotoSelector = ({image,setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl,setPreviewUrl] = useState(null); 
    
    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            setImage(file);
            const preview = URL.createObjectURL(file); //Make a quick preview link from the image file, and store it in previewUrl so I can show it in the UI.
            setPreviewUrl(preview);
        }
    };
    /* tempory url
    That image is a file stored in your computer — it's not a link or URL yet.
But you want to show a preview of that image inside your app before uploading it anywhere,So, React (JavaScript) uses this:
URL.createObjectURL(file).It turns your file into a temporary link that looks like:blob:http://localhost:3000/2dfg3f4-abc...
This is called a temporary preview URL — because:It disappears when you reload the page or remove the image.*/

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {  /* To give users a custom button or icon to open the file picker instead of the default boring "Choose File" button. */
        inputRef.current.click();
    };

    /* const inputRef = useRef(null);You’re creating a reference named inputRef.
At first, it’s empty (null).Then, you connect it to your <input> like this:
<input ref={inputRef} ... />Now, React knows:inputRef.current means this <input> element.
🔹 Why use it? Because the input is hidden (className="hidden"), the user can’t click it directly.
So you do this:const onChooseFile = () => {
  inputRef.current.click();  // 👈 This simulates a user click on the input
};Even though the input is invisible, this line will open the file chooser.*/

  return (
    <div className='flex justify-center mb-6'>
        <input   //Browsers automatically show a file picker with "Choose File" 
            type="file" 
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />
        {!image ? (
            <div className='w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full relative '>
               <FaUserAlt className="text-4xl text-blue-400"/>
                <button
                 type='button'
                 className='w-8 h-8 flex items-center justify-center bg-blue-400 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-blue-600 transition'
                 onClick={onChooseFile}
                >
                    <FiUpload/>
                </button> 

            </div>
        ):(
            <div className='relative'>
                <img src={previewUrl} alt="prof pic" className='w-20 h-20 rounded-full object-cover' />
                <button 
                    type='button' 
                    className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-700 transition'
                    onClick={handleRemoveImage}
                >
                    <FaTrashAlt/>
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector