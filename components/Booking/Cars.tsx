import CarsList from '@/data/CarsList'
import React, { useState } from 'react'
import Image from "next/image";

function Cars() {
    const [selectedCar, setSelectedCar]=useState<any>()
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select</h2>
      <div
        className="grid 
        grid-cols-3 
        md:grid-cols-2 
        lg:grid-col-3
        p-2"
      >
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`m-2 p-2 border-[2px] rounded-md hover:border-yellow-400 cursor-pointer ${index==selectedCar ? 'border-yellow-400':null}`}
            onClick={() => setSelectedCar(index)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className="w-full"
            />
            <h2 className="text-[12px] text-gray-500">
              {item.name}
              <span className="float-right font-medium text-black">{item.charges * 8} €</span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars