"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import yslTok from '../contractInfo/yslTok.json'
import { BrowserProvider, ethers } from "ethers";

const CreateVote: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['', '']); // Two initial options
    const [showPopup, setShowPopup] = useState<boolean>(false);
    
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleCreateVote = () => {
        // Show confirmation popup
        setShowPopup(true);
        console.log("")
    };

    const handleConfirmCreateVote = async () => {
        const claimAmt = 1;
        const contractAddress = "0x4012e2e421631aD769cf2571c121A9A81e4fd1B1"
        const provider = new BrowserProvider(window.ethereum);
    
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log("Wallet Address:", address);
        const humorTokenContract = new ethers.Contract(contractAddress, yslTok.abi, signer)
        // mint();
        console.log(claimAmt, "========inside withdraw===")
    
        await (await humorTokenContract.donate(address,"0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe" ,ethers.parseUnits(claimAmt.toString(), 18))).wait();
    

        // Create vote logic (could include validation)
        const formattedOptions = options.map(option => ({ name: option, percentage: 0 })); // Ensure each option has name and percentage
        
        const newVote = { title, topic, options: formattedOptions };
    
        // Redirect to Explore page with newVote data as query parameter
        router.push(`/explore?newVote=${encodeURIComponent(JSON.stringify(newVote))}`);
    };
    

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 py-8"
            style={{
                backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/887/227/638/tech-sphere-wallpaper-preview.jpg)',
            }}
        >
            <div className="bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Create a Vote</h1>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 rounded text-black"
                />

                <input
                    type="text"
                    placeholder="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2 mb-4 rounded text-black"
                />

                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="w-full p-2 mb-4 rounded text-black"
                    />
                ))}

                <button
                    onClick={handleAddOption}
                    className="bg-red-600 text-white px-4 py-2 rounded mb-2 mr-4"  // Added margin-bottom for gap
                >
                    Add Option
                </button>

                <button
                    onClick={handleCreateVote}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Create Vote
                </button>

            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Are you sure to continue? This would require 1 YSL.</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={handleConfirmCreateVote}
                                className="bg-red-600 text-black px-4 py-2 rounded mr-2" // Added margin right for spacing
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleClosePopup}
                                className="bg-gray-400 text-black px-4 py-2 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateVote;
