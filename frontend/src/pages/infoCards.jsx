const InfoCard = ({ title , description, isRTL ,index}) => {

    return (
      <div className="relative p-8 bg-green-950/50 backdrop-blur-lg rounded-3xl w-full h-auto mx-auto">
        <div
          className={`flex ${index === 0 ? "flex-row-reverse" : "flex-row"} items-center justify-between gap-5 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div className={`flex flex-col justify-between `}>
            <h2
              className={`font-PNU ${
                  isRTL ? 'text-3xl text-[2.625rem]' : 'text-2xl text-[2rem]'
                } font-bold text-secondary mb-2 leading-tight`}
            >
              {title}
            </h2>
            <br></br>
            <p className={`text-gray-300 leading-relaxed ${
                      isRTL ? 'text-[1.5rem]' : 'text-[1.25rem]'
                  }`}>
              {description}
            </p>
          </div>
  
          <img
            src="https://res.cloudinary.com/dbqf0wq9s/image/upload/v1721743014/k8ad75fp3jgy9e235fmr.jpg"
            alt="Card Image"
            className="rounded-2xl mb-4 md:mb-0 md:ml-6 object-cover w-auto h-min max-h-[550px]"
          />
  
        </div>
      </div>
    );
  };
  
  export default InfoCard;