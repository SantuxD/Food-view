import React from "react";

function PartnerProfile() {
    const videos = new Array(9).fill(0).map((_, i) => ({ id: i + 1 }));

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
            <div className="w-[360px] bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-pink-500">
                {/* Top card */}
                <div className="px-5 pt-5 pb-6 bg-pink-400 text-white">
                    <div className="flex gap-4 items-start">
                        <div className="w-20 h-20 rounded-full bg-green-700 shadow-inner flex-shrink-0" />

                        <div className="flex-1">
                            <div className="mb-2">
                                <div className="inline-block bg-green-700 px-4 py-2 rounded-lg font-semibold text-white text-sm">
                                    bussiness name
                                </div>
                            </div>
                            <div>
                                <div className="inline-block bg-green-700 px-4 py-2 rounded-lg font-medium text-white text-sm">
                                    Address
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-white/30 pt-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <div className="text-xs uppercase text-white/90 font-medium mb-2">total meals</div>
                                <div className="inline-block bg-pink-300/40 px-3 py-2 rounded-md text-center font-bold text-white">43</div>
                            </div>

                            <div className="flex-1">
                                <div className="text-xs uppercase text-white/90 font-medium mb-2">customer serve</div>
                                <div className="inline-block bg-pink-300/40 px-3 py-2 rounded-md text-center font-bold text-white">15K</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-2 bg-white" />

                <div className="p-3 bg-white">
                    <div className="grid grid-cols-3 gap-2">
                        {videos.map((v) => (
                            <div key={v.id} className="bg-sky-700 aspect-[3/4] rounded-sm flex items-center justify-center border-2 border-white/80">
                                <div className="text-white text-sm font-semibold tracking-wide">
                                    <div className="border border-white/80 px-2 py-1 rounded">video</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 border-t border-dashed border-slate-300/40" />

                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {videos.slice(0, 3).map((v) => (
                            <div key={`b - ${v._id}`} className="bg-sky-700 aspect-[3/4] rounded-sm flex items-center justify-center border-2 border-white/80">
                        <div className="text-white text-sm font-semibold tracking-wide">
                            <div className="border border-white/80 px-2 py-1 rounded">video</div>
                        </div>
                    </div>
            ))}
                </div>
            </div>

            <div className="h-2 bg-red-600" />
        </div>
    </div >
  );
}

export default PartnerProfile;