import blueUmbrella from "./assets/Umbrella/Blue umbrella.png";
import pinkUmbrella from "./assets/Umbrella/Pink umbrella.png";
import yellowUmbrella from "./assets/Umbrella/Yello umbrella.png";
import loader from "../public/loader_icon.svg";
import { useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
function App() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [uploadedLogo, setUploadedLogo] = useState("");
  const [logoTitle, setLogoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const logoUrl = await getLogoUrl(logo);
      setUploadedLogo(logoUrl);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveLogo = (e) => {
    e.stopPropagation();
    setUploadedLogo("");
    setLogoTitle("");
  };
  console.log(uploadedLogo);
  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${
        selectedColor === "blue"
          ? "bg-blue-50"
          : selectedColor === "pink"
          ? "bg-pink-50"
          : selectedColor === "yellow"
          ? "bg-yellow-50"
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
          <div className="absolute bottom-6 left-1/2 overflow-hidden w-20 h-4 -translate-x-[50%]">
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
                selectedColor === "blue" && "border-[3px] border-gray-300"
              }`}
            ></div>
            <div
              onClick={() => setSelectedColor("pink")}
              className={`h-5 w-5 rounded-full bg-pink-400 ${
                selectedColor === "pink" && "border-[3px] border-gray-300"
              }`}
            ></div>
            <div
              onClick={() => setSelectedColor("yellow")}
              className={`h-5 w-5 rounded-full bg-yellow-400 ${
                selectedColor === "yellow" && "border-[3px] border-gray-300"
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

          <div
            className={`relative mt-6 flex items-center py-4 px-6 ${
              selectedColor === "blue"
                ? "bg-[#32B4E5]"
                : selectedColor === "pink"
                ? "bg-[#D9338C]"
                : selectedColor === "yellow"
                ? "bg-[#FED34A]"
                : ""
            } rounded-md text-white font-medium shadow-lg transition-colors duration-300`}
          >
            <label htmlFor="logo" className="cursor-pointer w-10">
              {/* Upload icon */}
              <span>
                {isLoading ? (
                  <img src={loader} className="animate-spin w-5"></img>
                ) : (
                  <LuUpload className="text-xl w-5" />
                )}
              </span>
            </label>

            {logoTitle ? logoTitle?.slice(0, 12) + "..." : "UPLOAD LOGO"}
            {uploadedLogo && (
              <span
                onClick={handleRemoveLogo}
                className="absolute right-0 mr-3 w-6 text-2xl"
              >
                <MdClose />
              </span>
            )}
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
