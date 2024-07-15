import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

interface LineComponentProps {
  setUniqueURL: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LineComponent: React.FC<LineComponentProps> = ({ setUniqueURL, setIsOpenModal }) => {
  const [channelSecret, setChannelSecret] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isChannelSecretSaved, setIsChannelSecretSaved] = useState(false);
  const [isEditingChannelSecret, setIsEditingChannelSecret] = useState(false);

  const handleSaveChannelSecret = () => {
    if (channelSecret) {
      setIsChannelSecretSaved(true);
      setIsEditingChannelSecret(false);
      //service for save channelSecret to db
    } else {
      toast.error("กรุณาป้อน Channel Secret");
    }
  };

  const handleEditChannelSecret = () => {
    setIsEditingChannelSecret(true);
  };

  const handleSaveAccessToken = () => {
    if (accessToken) {
      const webhookURL = `https://example.com/webhook/${accessToken}`;
      setUniqueURL(webhookURL);
      setIsOpenModal(true);
      //service get webhookURL for user coppy to line
    } else {
      toast.error("กรุณาป้อน Access Token");
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md mt-16 mb-8">
        <div className="mb-6">
          <label className="block mb-3 text-lg font-medium text-gray-700">
            กรุณาป้อน Channel Secret
          </label>
          <div className="flex">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-green-300"
              value={channelSecret}
              onChange={(e) => setChannelSecret(e.target.value)}
              placeholder="ป้อน Channel Secret"
              disabled={isChannelSecretSaved && !isEditingChannelSecret}
            />
            {isChannelSecretSaved && !isEditingChannelSecret ? (
              <button
                className="px-6 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition"
                onClick={handleEditChannelSecret}
              >
                <FaEdit className="w-5 h-5" />
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition"
                onClick={handleSaveChannelSecret}
              >
                <FaSave className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-3 text-lg font-medium text-gray-700">
            กรุณาป้อน Access Token
          </label>
          <div className="flex">
            <input
              type="text"
              className={`flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-green-300 ${
                !isChannelSecretSaved ? "bg-gray-100" : ""
              }`}
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="ป้อน Access Token"
              disabled={!isChannelSecretSaved}
            />
            <button
              className={`px-6 py-2 rounded-r-lg transition ${
                isChannelSecretSaved
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSaveAccessToken}
              disabled={!isChannelSecretSaved}
            >
              <FaSave className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#555]">
          ขั้นตอนการเชื่อมต่อ inbox กับ Line
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-lg text-gray-700">
          <li>นี่คือตัวอย่างข้อความ</li>
          <li>นี่คือตัวอย่างข้อความ</li>
          <li>นี่คือตัวอย่างข้อความ</li>
          <li>นี่คือตัวอย่างข้อความ</li>
          <li>นี่คือตัวอย่างข้อความ</li>
        </ol>
      </div>

      <div className="mt-10 aspect-video bg-white rounded-lg flex items-center justify-center">
        <iframe
          width="560"
          height="310"
          src="https://www.youtube.com/embed/2Ul4FzP_0ag?si=tqcEupOa_iWmNpg8"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="rounded-xl shadow-xl"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default LineComponent;
