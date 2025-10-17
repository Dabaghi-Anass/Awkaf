import { useState } from "react";

export default function ZakatSelectionPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (


   <>
    <Header></Header>
         <div className=" bg-gray-300 flex flex-col items-center justify-center p-8 space-y-6 h-[45em]">
      {!selectedOption && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setSelectedOption("company")}
            className="category cursor-pointer   p-8 rounded-2xl shadow-md hover:bg-green-50 transition h-[25em] bg-[url('./assets/images/ZkatPics/building.jpg')] bg-cover bg-center"
          >
           <div className="category-text ">
           <h2 className="text-2xl font-semibold text-green-900">Company Zakat</h2>
            <p className="text-sm mt-2 text-gray-600">
              Calculate Zakat for business and corporate assets.
            </p>
           </div>
          </div>

          <div
            onClick={() => setSelectedOption("farming")}
            className="cursor-pointer   p-8 rounded-2xl shadow-md hover:bg-green-50 transition bg-[url('./assets/images/ZkatPics/ma7asil.jpg')] bg-cover bg-center"
          >
            <h2 className="text-2xl font-semibold text-green-900">
               Mahasil Zakat
            </h2>
            <p className="text-sm mt-2 text-gray-600">
              Calculate Zakat for livestock and agricultural crops.
            </p>
          </div>

          <div
            onClick={() => setSelectedOption("mawashi")}
            className="cursor-pointer   p-8 rounded-2xl shadow-md hover:bg-green-50 transition bg-[url('./assets/images/ZkatPics/mawashi.jpg')] bg-cover bg-center"
          >
            <h2 className="text-2xl font-semibold text-green-900">
              Mawashi Zakat
            </h2>
            <p className="text-sm mt-2 text-gray-600">
              Calculate Zakat for agricultural crops.
            </p>
          </div>
        </div>
      )}

      {selectedOption === "company" && (
        <CalForm />
      )}

      {selectedOption === "farming" && (
        <LivestockCropZakatComponent />
      )}
    </div>
    <Footer></Footer>
   </>
  );
}
