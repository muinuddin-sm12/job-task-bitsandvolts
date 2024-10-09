import blueUmbrella from "./assets/Umbrella/Blue umbrella.png";
import pinkUmbrella from "./assets/Umbrella/Pink umbrella.png";
import yellowUmbrella from "./assets/Umbrella/Yello umbrella.png";
import uploadLogo from "../public/upload_icon.svg";
import { useState } from "react";
function App() {
  const [selectedColor, setSelectedColor] = useState("blue");

  console.log(selectedColor);
  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${
        selectedColor === "blue"
          ? "bg-blue-100"
          : selectedColor === "pink"
          ? "bg-pink-100"
          : selectedColor === "yellow"
          ? "bg-yellow-100"
          : ""
      }`}
    >
      <div className="w-[80%] flex flex-col md:flex-row items-center justify-center gap-20">
        <div>
          <img
            className="w-[350px]"
            src={
              selectedColor === "blue"
                ? blueUmbrella
                : selectedColor === "pink"
                ? pinkUmbrella
                : selectedColor === "yellow"
                ? yellowUmbrella
                : ""
            }
            alt=""
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-6">Custom Umbrella</h2>
          <div className="flex items-center gap-4 mb-4">
            <div
              onClick={() => setSelectedColor("blue")}
              className={`h-5 w-5 rounded-full bg-blue-400 ${
                selectedColor === "blue" && "border-[3px] border-white"
              }`}
            ></div>
            <div
              onClick={() => setSelectedColor("pink")}
              className={`h-5 w-5 rounded-full bg-pink-400 ${
                selectedColor === "pink" && "border-[3px] border-white"
              }`}
            ></div>
            <div
              onClick={() => setSelectedColor("yellow")}
              className={`h-5 w-5 rounded-full bg-yellow-400 ${
                selectedColor === "yellow" && "border-[3px] border-white"
              }`}
            ></div>
          </div>
          <div>
            <h4 className="font-medium">Customize your umbrella</h4>
            <p className="text-sm text-gray-500">
              Upload a logo for an instant preview.
            </p>
            <span className="text-[12px] text-gray-500">
              .png and .jpg files only. Max file size is 5MB
            </span>
          </div>
          <div className="mt-6 py-2 px-4 rounded-md text-white font-medium bg-sky-400">
            <button className="uppercase flex items-center">
              <span className="w-16">
                <img className="w-5" src={uploadLogo} alt="" />
              </span>
              Upload Logo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
