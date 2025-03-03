import React, { useState, useContext } from "react";
import Barcode from "react-barcode";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BackgroundContext } from "../../../../Contexts/BackgroundContext";

import bgImage from "../../../../assets/images/bgdesign.png";
import bgImage1 from "../../../../assets/images/bgdesin2.png";
import bgImage2 from "../../../../assets/images/bgdesin3.png";
import bgImage3 from "../../../../assets/images/bgdesing4.jpg";

const CardSettings = ({ onStyleApply }) => {
  const { selectedBackground, applyBackground, appliedCards, setAppliedCards } =
    useContext(BackgroundContext);
  const [isFront, setIsFront] = useState(true);

  const cards = [
    { id: 1, bgImage: bgImage, name: "Student 1" },
    { id: 2, bgImage: bgImage1, name: "Student 2" },
    { id: 3, bgImage: bgImage2, name: "Student 3" },
    { id: 4, bgImage: bgImage3, name: "Student 4" },
  ];

  const toggleSide = () => setIsFront(!isFront);

  const applyStyle = (bgImage, id) => {
    applyBackground(bgImage);
    setAppliedCards((prev) => {
      // Reset all cards to false, then mark only the current one as true
      const newAppliedCards = {};
      newAppliedCards[id] = true; // Mark the current card as applied
      return newAppliedCards; // Return only the updated state for the current card
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md rounded-lg">
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {cards.map((card) => (
          <div key={card.id} className="flext w-[250px] h-[400px]">
            <div
              className={`w-full h-full rounded-lg shadow-xl transform transition-transform duration-700 ${
                isFront ? "rotate-y-0" : "rotate-y-180"
              }`}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 items-center bg-gradient-to-b from-gray-300 to-gray-700 h-full p-4 bg-gray-400 text-white backface-hidden ${
                  isFront ? "z-10" : "z-0"
                }`}
              >
                <div
                  className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 h-full rounded-lg shadow-lg"
                  style={{
                    backgroundImage: `url(${card.bgImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={"https://via.placeholder.com/150"}
                      alt="Student Photo"
                      className="w-48 h-44 rounded-md object-cover shadow-lg"
                    />
                    <h2 className="text-xl font-bold mt-1">{card.name}</h2>
                    <Barcode
                      value={"1234567890"}
                      width={1.5}
                      height={30}
                      displayValue={false}
                      background="transparent"
                      lineColor="#fff"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={toggleSide}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      onClick={() => applyStyle(card.bgImage, card.id)}
                      className={`px-4 py-2 rounded-md font-bold ${
                        appliedCards[card.id]
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white`}
                    >
                      {appliedCards[card.id] ? "Applied" : "Apply"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-between h-full p-4 bg-gradient-to-b from-gray-300 to-gray-700 text-white backface-hidden transform rotate-y-180 ${
                  isFront ? "z-0" : "z-10"
                }`}
              >
                <div
                  className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 h-full rounded-lg shadow-lg"
                  style={{
                    backgroundImage: `url(${card.bgImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="space-y-4 ml-0 text-xs">
                    <h3 className="text-lg font-bold">Details</h3>
                    <p>
                      <strong>Campus:</strong> {"Main Campus"}
                    </p>
                    <p>
                      <strong>Father's Name:</strong> {"John Doe"}
                    </p>
                  </div>
                  <button
                    onClick={toggleSide}
                    className="bg-yellow-400 text-black px-4 py-2 mt-8 rounded-md hover:bg-yellow-500"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSettings;
