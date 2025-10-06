
import React from 'react'
import api from '../../services/Api';
import { useParams } from 'react-router-dom';

const PartnerProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = React.useState(null);
    const [videos, setVideos] = React.useState([]);
    React.useEffect(() => {
        // Fetch profile data using the id
        api.get(`/food-partner/${id}`)
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems || []);

            })
            .catch(error => {
                console.error("Error fetching profile data:", error);
            });



    }, [id])
    if (!profile) return <div className="text-center mt-10">Loading...</div>;


    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* ---- Profile Header ---- */}
            <div className="max-w-4xl mx-auto p-6 flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b border-gray-200">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                    <img
                        src={profile.image || "https://www.google.com/imgres?q=man&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1445597021%2Fphoto%2Fblack-man-phone-and-social-media-in-city-reading-text-message-or-communication-on-social.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DB7pEc-0pgtUw33hz9P5-row1Go3YwwHacUJrE-lCNgA%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fhe-man%3Fpage%3D2&docid=tPOGSO0XyxEVvM&tbnid=IcQ0Wuc7Eo_hKM&vet=12ahUKEwjunJqFgZCQAxWHbmwGHcUhFGcQM3oECCUQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwjunJqFgZCQAxWHbmwGHcUhFGcQM3oECCUQAA"} // add image field or default placeholder
                        alt={profile.companyName}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-300"
                    />
                </div>

                {/* Partner Details */}
                <div className="flex flex-col sm:flex-1 gap-3 text-center sm:text-left">
                    <div className="text-2xl font-bold">{profile.companyName}</div>
                    <div className="text-gray-500">{profile.address}</div>

                    {/* Stats Section */}
                    <div className="flex justify-center sm:justify-start gap-8 mt-2">
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-lg">{profile.totalMeals}</span>
                            <span className="text-sm text-gray-500">Meals</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-lg">
                                {profile.customersServed}
                            </span>
                            <span className="text-sm text-gray-500">Customers</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-lg">{videos.length}</span>
                            <span className="text-sm text-gray-500">Videos</span>
                        </div>
                    </div>

                    {/* Description / Bio */}
                    <p className="mt-3 text-gray-600">
                        {profile.description || "Welcome to our food service partner page!"}
                    </p>
                </div>
            </div>

            {/* ---- Videos Section ---- */}
            <div className="max-w-5xl mx-auto p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                    Videos
                </h2>

                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {videos.map((video) => (
                            <div
                                key={video._id}
                                className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                <video
                                    src={video.video}
                                    controls
                                    muted
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-2 text-center text-sm font-medium text-gray-700">
                                    {video.name}
                                </div>

                                {/* Hover overlay (like Instagram hover) */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition-opacity">
                                    ▶ Play
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        No videos uploaded yet.
                    </div>
                )}
            </div>
        </div>
    );
}

export default PartnerProfile