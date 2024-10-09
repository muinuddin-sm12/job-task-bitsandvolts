import blueUmbrella from "./assets/Umbrella/Blue umbrella.png";
import pinkUmbrella from "./assets/Umbrella/Pink umbrella.png";
import yellowUmbrella from "./assets/Umbrella/Yello umbrella.png";
import uploadLogo from "../public/upload_icon.svg";
import { useState } from "react";
import axios from "axios";
function App() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [uploadedLogo, setUploadedLogo] = useState("");
  const [logoTitle, setLogoTitle] = useState("");

  const getLogoUrl = async (logo) => {
    try {
      const formData = new FormData();
      formData.append("image", logo);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      setLogoTitle(data.data.title);
      return data.data.display_url;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUploadLogo = async (e) => {
    const logo = e.target.files[0];
    // console.log(logo);
    try {
      const logoUrl = await getLogoUrl(logo);
      setUploadedLogo(logoUrl);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(uploadedLogo);
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
        <div className="relative">
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
          <div className="absolute bottom-6 left-1/2 overflow-hidden w-20 h-5 -translate-x-[50%]">
            {uploadedLogo && (
              <img
                className="object-cover h-full w-full"
                src={uploadedLogo}
              ></img>
            )}
          </div>
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
          <div className="mt-6 py-2 px-4 rounded-md text-white font-medium">
            <label
              htmlFor="logo"
              className={`flex items-center justify-center w-full gap-6 ${
                selectedColor === "blue"
                  ? "bg-blue-500"
                  : selectedColor === "pink"
                  ? "bg-pink-500"
                  : selectedColor === "yellow"
                  ? "bg-yellow-500"
                  : ""
              } text-white py-3 rounded cursor-pointer shadow-lg transition-colors duration-300`}
            >
              {/* Upload icon */}
              <span>
                <img src={uploadLogo} className="w-5" alt="Upload Logo" />
              </span>
              {logoTitle ? logoTitle.slice(0, 15) + "..." : "UPLOAD LOGO"}
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              name="logo"
              className="hidden"
              onChange={handleUploadLogo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
