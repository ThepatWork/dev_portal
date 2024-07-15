// ConnectionSetting.tsx
import React, { useEffect, useState } from "react";
import { useDataChannel, useProductStore } from "@/store/dataChannel";
import ecommerceService from "@/service/ChannelService/EcommerceService";
import ModalLineDistination from "@/components/ChannelComponent/ConnectionSetting/ModalLineDistination";
import LineComponent from "@/components/ChannelComponent/ConnectionSetting/Line";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScollUpToTop } from "@/utils/Scoll";
import { IStore } from "@/models/IChannel";

const ConnectionSetting: React.FC = () => {
  ScollUpToTop();
  const [destination, setDestination] = useState<string>("");
  const { products } = useProductStore();
  const { dataChannel } = useDataChannel();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Line");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [uniqueURL, setUniqueURL] = useState("");

  const platforms = ["Line", "Messenger", "API", "Discord", "Embed"];

  useEffect(() => {
    const socket = new WebSocket('wss://ainbox-ke5m6qbmkq-as.a.run.app/ws');
    let isFirstMessage = true;

    socket.onmessage = function(event) {
      if (isFirstMessage) {
        const data = event.data;
        setDestination(data);
        console.log('First message from server:', data);
        isFirstMessage = false;
      }
    };

    socket.onopen = function(event) {
      console.log('WebSocket connection established');
    };

    socket.onerror = function(error) {
      console.error('WebSocket error:', error);
    };

    socket.onclose = function(event) {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const storeDetail: IStore = {
    page_id: destination,
    details: {
      ai_name: dataChannel!.ai_name,
      ai_behavior: dataChannel!.ai_behavior,
      ai_age: dataChannel!.ai_age,
      business_name: dataChannel!.business_name,
      business_type: dataChannel!.business_type,
      address: dataChannel!.address,
      phone: dataChannel!.phone,
      email: dataChannel!.email,
      website: dataChannel!.website,
      opentime: dataChannel!.opentime,
      description: dataChannel!.description,
      ai_gender: dataChannel!.ai_gender,
      product: products.map((product) => {
        return {
          name: product.name,
          price: product.price,
          description: product.description,
          url_link: product.url_link,
        };
      })
    }
  };

  const handleSubmitStore = async () => {
    if (destination) {
      await ecommerceService.createShop(destination, storeDetail);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 px-24 rounded-lg">
      <h1 className="text-center text-[42px] font-black text-orange-400 mb-10">
        {dataChannel ? dataChannel.business_name : ""}
      </h1>

      <div className="flex justify-center space-x-4 mb-8 pt-0">
        {platforms.map((platform) => (
          <button
            key={platform}
            className={`px-5 py-2.5 rounded-full transition ${
              selectedPlatform === platform
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedPlatform(platform)}
          >
            {platform}
          </button>
        ))}
      </div>

      {selectedPlatform === platforms[0] && (
        <LineComponent setUniqueURL={setUniqueURL} setIsOpenModal={setIsOpenModal} />
      )}
      {selectedPlatform !== platforms[0] && (
        <div className="flex justify-center items-center h-[20vw] w-full text-[#555]">
          เรากำลังพัฒนาเร่ง เพื่อให้พร้อมใช้งานในเร็ว ๆ นี้
        </div>
      )}

      <ModalLineDistination
        uniqueURL={uniqueURL}
        open={isOpenModal}
        close={handleCloseModal}
      />
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ConnectionSetting;
