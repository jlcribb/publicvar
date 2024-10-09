import watermark from "../../assets/img/watermark.png";

const Water = ({ title, subtitle }) => {
  return (
    // <div
    //   className="relative bg-white p-8 h-64 bg-center bg-no-repeat bg-contain"
    //   style={{ backgroundImage: `url(${watermark})`, opacity: 0.2 }}
    // >
    //   <div className="relative z-10">
    //     <h1 className="text-2xl font-bold">{title}</h1>
    //     <p>{subtitle}</p>
    //   </div>
    // </div>
    <div
      className="relative   bg-white h-64 bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${watermark})`,
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <div className="relative z-10 p-8 pt-32">
        <h1 className="text-3xl font-bold text-indigo-500 justify-center">
          {title}
        </h1>
        {/* <p className="text-xl text-indigo-600 justify-center">{subtitle}</p> */}
        <a href="#" >
          
          <p className=" text-xl text-indigo-400 justify-center">{subtitle}</p> 
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default Water;
