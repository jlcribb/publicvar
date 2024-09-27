function ServicesCard({ data, index }) {
  return (
    <div
      onMouseEnter={() => {
        const title_element = document.getElementById(index);
        title_element.classList.add("text-indigo-600");
        // title_element.classList.remove("text-gray-900");
        // const img = document.getElementById(data.id)
        // img.classList.add('object-scale-down')
      }}
      onMouseLeave={() => {
        const title_element = document.getElementById(index);
        title_element.classList.remove("text-indigo-600");
        // title_element.classList.add("text-gray-900");
        // const img = document.getElementById(data.id)
        // img.classList.remove('object-scale-down')
      }}
      className="p-8 w-full relative h-96 lg:h-[200pm] bg-white  hover:-translate-y-1 transition duration-300 ease-in-out"
    >
      <div className="w-full">
        <img src={data.img} className="w-10 h-10" />
        <h2 className="text-xl font-semibold text-gray-900 pt-8">
          {data.title}{" "}
        </h2>
        <p className="text-x font-regular text-gray-500 pt-4">
          {data.description}{" "}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 p-8">
        <h2 id={index} className="items-end text-xl font-semibold  pt-8">
          Lea más</h2>
      </div>
    </div>
  );
}
export default ServicesCard;
