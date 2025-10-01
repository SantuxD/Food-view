
import React from 'react'
import api from '../../services/Api';
import { useParams } from 'react-router-dom';

const PartnerProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = React.useState(null);
    React.useEffect(() => {
        // Fetch profile data using the id
        api.get(`/food-partner/${id}`).then(response => setProfile(response.data.foodPartner)).catch(err => console.log(err));
    }, [id]);

    if (!profile) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-md w-full mx-auto mt-8 rounded-xl shadow-lg overflow-hidden">
            {/* Top Section */}
            <div className="p-6 flex flex-col items-center rounded-t-xl">
                <div className="flex w-full gap-4 items-center mb-4 flex-col sm:flex-row">
                    <div className="w-20 h-20 rounded-full border-4" />
                    <div className="flex flex-col flex-1 gap-2 w-full sm:w-auto">
                        <div className=" rounded-md px-3 py-1 font-semibold text-center">{profile?.
                            companyName}</div>
                        <div className=" rounded-md px-3 py-1 font-semibold text-center">{profile?.address}</div>
                    </div>
                </div>
                <div className="flex w-full justify-between mt-2 flex-col sm:flex-row gap-2">
                    <div className="flex flex-col items-center flex-1">
                        <div className=" rounded px-2 py-1 text-sm font-medium mb-1">total meals</div>
                        <div className="text-2xl font-bold">{profile?.totalMeals}</div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                        <div className=" rounded px-2 py-1 text-sm font-medium mb-1">customer served</div>
                        <div className="text-2xl font-bold">{profile?.customersServed}</div>
                    </div>
                </div>
            </div>
            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-4 p-6">
                {Array.from({ length: 9 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-center aspect-square  rounded-lg shadow  font-semibold text-lg border"
                    >
                        video
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PartnerProfile