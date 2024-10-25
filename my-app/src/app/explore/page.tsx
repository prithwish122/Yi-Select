"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Streak from '../components/Streak';
import questTok from '../contractInfo/yslTok.json'
import { BrowserProvider, ethers } from 'ethers';

interface Option {
  name: string;
  percentage: number;
}

interface VotingTopic {
  title: string;
  topic: string;
  options: Option[];
}

const Explore: React.FC = () => {
  const searchParams = useSearchParams();
  const [newVote, setNewVote] = useState<VotingTopic | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<VotingTopic | null>(null);
  const [voteSuccess, setVoteSuccess] = useState<boolean>(false);

  // Demo data for voting topics
  const votingTopics: VotingTopic[] = [
    {
      title: "Best Gaming Console of 2024?",
      topic: "Gaming",
      options: [
        { name: "PlayStation 5", percentage: 55 },
        { name: "Xbox Series X", percentage: 30 },
        { name: "Nintendo Switch", percentage: 15 },
      ],
    },
    {
      title: "Favorite Game Genre?",
      topic: "Gaming",
      options: [
        { name: "Action", percentage: 40 },
        { name: "RPG", percentage: 35 },
        { name: "Sports", percentage: 25 },
      ],
    },
  ];

  useEffect(() => {
    const newVoteParam = searchParams.get('newVote');
    if (newVoteParam) {
      try {
        const parsedVote: VotingTopic = JSON.parse(newVoteParam);

        // Ensure options are correctly formatted
        // const formattedOptions: Option[] = parsedVote.options.map((option: { name: string }) => ({
        //   name: option.name, // Extract name property
        //   percentage: 0, // Default percentage for new options
        // }));

        // Set newVote with the parsed data
        setNewVote({
          title: parsedVote.title,
          topic: parsedVote.topic,
          options: parsedVote.options, // Use formatted options
        });
      } catch (error) {
        console.error("Error parsing newVote parameter:", error);
      }
    }
  }, [searchParams]);

  // Combine existing topics with the new vote
  const combinedTopics = newVote ? [...votingTopics, newVote] : votingTopics;

  const handleTopicClick = (topic: VotingTopic) => {
    setSelectedTopic(topic);
    setShowPopup(true);
  };

  const handleVote = async () => {
    // Show confirmation that voting requires 10 QF
    if (window.confirm("This vote requires 1 YSL. Do you want to proceed?")) {

      const claimAmt = 1;
      const contractAddress = "0x4012e2e421631aD769cf2571c121A9A81e4fd1B1"
      const provider = new BrowserProvider(window.ethereum);
  
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Wallet Address:", address);
      const humorTokenContract = new ethers.Contract(contractAddress, questTok.abi, signer)
      // mint();
      console.log(claimAmt, "========inside withdraw===")
  
      await (await humorTokenContract.donate(address,"0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe" ,ethers.parseUnits(claimAmt.toString(), 18))).wait();
  
      setVoteSuccess(true);
      setShowPopup(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center px-4 py-8"
      style={{
        backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/887/227/638/tech-sphere-wallpaper-preview.jpg)',
      }}
    >
      {/* <h1 className="text-4xl font-bold text-white mb-8 text-center">Explore Hot Voting Topics</h1> */}

      <div className="w-full max-w-3xl space-y-8 mt-20">
        {combinedTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg cursor-pointer hover:bg-white/30"
            onClick={() => handleTopicClick(topic)}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">{topic.title}</h2>
            <div className="space-y-2">
              {topic.options.map((option, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-white text-lg">{option.name}</span>
                  <div className="w-2/3 bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-red-600 h-full"
                      style={{ width: `${option.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white ml-4">{option.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popup for voting options */}
      {showPopup && selectedTopic && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">{selectedTopic.title}</h2>
            <div className="space-y-2">
              {selectedTopic.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={handleVote}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded mb-2"
                >
                  {option.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Message after Voting */}
      {voteSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded">
          Vote recorded successfully!
        </div>
      )}

      <div className='fixed ml-[1200px] bottom-[400px]'>
      <Streak totalPY={0} setTotalPY={function (amount: number): void {
          
        } }/>
        

      </div>
    </div>
  );
};

export default Explore;
