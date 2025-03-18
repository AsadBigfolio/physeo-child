import Slider from "@/components/Slider";
import Image from "next/image";
import Link from "next/link";

const ShopProductsSection = () => {
  const productList = [
    {
      imageUrl: "/Product1.png",
      title: "AL13NS™ Digital Poster",
      price: "$ 16,500",
      oldPrice: "$ 34,500",
    },
    {
      imageUrl: "/Product2.png",
      title: "AL13NS™ Digital Poster",
      price: "$ 16,500",
      oldPrice: "$ 34,500",
    },
    {
      imageUrl: "/Product3.png",
      title: "AL13NS™ Digital Poster",
      price: "$ 16,500",
      oldPrice: "$ 34,500",
    },
    {
      imageUrl: "/Product1.png",
      title: "AL13NS™ Digital Poster",
      price: "$ 16,500",
      oldPrice: "$ 34,500",
    },
    {
      imageUrl: "/Product2.png",
      title: "AL13NS™ Digital Poster",
      price: "$ 16,500",
      oldPrice: "$ 34,500",
    },
  ];
  return (
    <section className="flex flex-col items-center pl-[5%] xl:pl-[8%] justify-between pb-[100px] relative text-mainText">
      <div className="w-full flex flex-col items-center mb-[30px] lg:mb-[60px] 2xl:mb-[80px] max-w-[660px] pr-[20px] md:pr-0">
        <h1 className="flex gap-2 text-heading-md 2xl:text-[42px] font-bold">
          Shop <span className="text-primary">Products</span>
        </h1>
        <p className="max-w-[660px] text-center text-para-base 2xl:text-para-lg font-poppins">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
      <div className="w-full">
        <Slider>
          {productList.map((product, index) => {
            return (
              <div
                className="min-w-[283px] min-h-[352px] lg:min-h-[342px] lg:min-w-[273px] 2xl:h-[633px] 2xl:min-w-[506px] inset-0 relative rounded-[20px] overflow-hidden"
                key={index}
              >
                <Image
                  src={product.imageUrl}
                  objectFit="cover"
                  fill={true}
                  alt=""
                />
                <div className="absolute h-full w-full inset-0 flex justify-end px-[25px] flex-col">
                  <p className="text-para-lg 2xl:text-heading-md font-poppins font-bold mb-[10px] 2xl:mb-[20px] text-white leading-[34px] 2xl:leading-[48px] underline">
                    AL13NS™ Digital Poster
                  </p>
                  <div className="text-para-base 2xl:text-title-xl text-white mb-[15px] 2xl:mb-[50px] flex font-poppins gap-[10px]">
                    <p className="font-bold">$ 16,500</p>
                    <p className="line-through opacity-50">$ 34,500</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default ShopProductsSection;
