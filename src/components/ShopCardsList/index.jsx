import { useState } from 'react';
import ShopCard from '../ShopCard';
import CheckboxInput from '../InputFields/ChecboxField';

const dummyData = [
  {
    title: "Ufology",
    image: "/course-example.png",
    link: "/courses/course/ufology",
    price: 100,
    quantity: 10,
  },
  {
    title: "Astrobiology",
    image: "/course-example.png",
    link: "/courses/course/astrobiology",
    price: 150,
    quantity: 5,
  },
  {
    title: "Quantum Physics",
    image: "/course-example.png",
    link: "/courses/course/quantum-physics",
    price: 200,
    quantity: 8,
  },
  {
    title: "Cosmology",
    image: "/course-example.png",
    link: "/courses/course/cosmology",
    price: 120,
    quantity: 12,
  },
  {
    title: "Astronomy",
    image: "/course-example.png",
    link: "/courses/course/astronomy",
    price: 130,
    quantity: 15,
  },
  {
    title: "Astrophysics",
    image: "/course-example.png",
    link: "/courses/course/astrophysics",
    price: 180,
    quantity: 7,
  },
];

const filterData = [
  "Filter 1",
  "Filter 2",
  "Filter 3",
  "Filter 4",
  "Filter 5",
  "Filter 6",
  "Filter 7",
  "Filter 8",
];

const ShopCardList = () => {
  const [shopItems, setShopItems] = useState(dummyData);

  const handleQuantity = (index, action) => {
    let dataCopy = [...shopItems];
    if (action === '+') {
      dataCopy[index].quantity++;
    }
    if (action === '-' && dataCopy[index].quantity > 1) {
      dataCopy[index].quantity--;
    }
    setShopItems(dataCopy);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 px-[30px] xl:pl-[50px] xl:pr-[80px] 2xl:pl-[80px] 2xl:pr-[160px] max-w-[1920px] mx-auto">
      {/* Checklist Section */}
      <div className="w-full lg:w-[15%] 2xl:w-1/4 p-4">
        <h2 className="text-[28px] font-bold mb-4">Filters</h2>
        <div className="w-full border-t border-[#DDDDDD] my-4" />
        <ul className="space-y-2 mx-3">
          {filterData.map((filter, index) => (
            <li key={index} className="flex items-center">
              <CheckboxInput
                label={filter}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Shop Card List Section */}
      <div className="w-full lg:w-[85%] 2xl:w-3/4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[25px] 2xl:gap-[30px]">
          {shopItems.map((course, index) => (
            <ShopCard key={index} {...course} handleQuantity={handleQuantity} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCardList;
