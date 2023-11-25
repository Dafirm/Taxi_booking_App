import CarsList from '@/data/CarsList'
import React, { useContext, useState } from 'react'
import Image from "next/image";
import { DirectionDataContext } from '@/context/DirectionDataContext';
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext';

function Cars() {
    const [selectedCar, setSelectedCar]=useState<any>()
    const { directionData, setDirectionData } =
      useContext(DirectionDataContext);
      const {carAmount, setCarAmount}=useContext(SelectedCarAmountContext)

      const getCost =(charges:any) => {
        return (charges*directionData
          .routes[0].distance*0.000621371192).toFixed(2)
      }

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
            onClick={() => {setSelectedCar(index)
            setCarAmount(getCost(item.charges));
            }}
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
              {directionData.routes?
              <span className="float-right font-medium text-black">{getCost(item.charges)} €
              </span>:null}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars