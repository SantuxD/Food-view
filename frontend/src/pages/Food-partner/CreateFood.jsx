import React, { useRef, useState } from 'react'
import api from '../../services/Api';
import { useNavigate } from 'react-router-dom';



const CreateFood = ({ onSubmit }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();


    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        } else {
            alert("Please select a valid video file.");
        }
    };


    const handleSubmit = async(e) => {
        e.preventDefault();




        if (!videoFile || !name || !description) {
            alert("All fields are required!");
            return;
        }


        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("name", name);
        formData.append("description", description);

      const res =  await api.post("/food", formData, {
          withCredentials: true,
        });
        console.log(res.data);


        if (onSubmit) {
            onSubmit(formData);
        } else {
            console.log("Form Data:", Object.fromEntries(formData));
            alert("Food created successfully!");
        }

        navigate("/");


        setVideoFile(null);
        setVideoPreview(null);
        setName("");
        setDescription("");
        inputRef.current.value = null;
    };

    return (

        <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl mt-8 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
                Create Food Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        placeholder='choose file'
                        ref={inputRef}
                        onChange={handleVideoChange}
                        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                    {videoPreview && (
                        <video
                            src={videoPreview}
                            controls
                            className="w-full mt-3 rounded-lg shadow-md"
                        />
                    )}
                </div>


                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter food name"
                        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>


                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        rows="3"
                        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                    Create Food
                </button>
            </form>
        </div>

    )
}

export default CreateFood 