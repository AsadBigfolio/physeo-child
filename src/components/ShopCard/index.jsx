import Link from "next/link";

const ShopCard = ({ image, title, quantity, price, handleQuantity, index }) => {
  return (
    <div key={index} className="bg-white rounded-lg pb-4">
      <img
        className="aspect-video object-cover rounded-[20px]"
        src={image}
        alt={title}
      />
      <div className='p-[10px] 2xl:p-3'>
        <h2 className="font-bold text-title-lg 2xl:text-para-lg">{title}</h2>
        <p className="text-base 2xl:text-title-lg text-[#202020]">
          ${price ?? 10}.00
        </p>
        <div className='flex justify-between items-center'>
          <div className="flex space-x-[10px] 2xl:space-x-4 ">
            <button
              onClick={() => handleQuantity(index, '-')}
              className={`w-6 h-6 2xl:w-8 2xl:h-8 flex items-center justify-center rounded-full bg-[#8350DF] text-white text-xl ${quantity === 1 ? "cursor-not-allowed" : "hover:bg-[#6B3CBD] active:scale-95 transition-transform duration-200 ease-in-out"}`}
              disabled={quantity === 1}
            >
              -
            </button>
            <p className="text-para-base 2xl:text-title-lg text-[#202020]">
              {quantity ?? 1}
            </p>
            <button
              onClick={() => handleQuantity(index, '+')}
              className="w-6 h-6 2xl:w-8 2xl:h-8 flex items-center justify-center rounded-full bg-[#491A8B] text-white text-xl hover:bg-[#3B2A8B] active:scale-95 transition-transform duration-200 ease-in-out"
            >
              +
            </button>
          </div>

          <button
            className="px-5 py-3 2xl:px-12 2xl:py-4 rounded-full bg-[#491A8B] text-white transition-transform duration-300 ease-in-out hover:bg-[#8350DF] active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShopCard;
