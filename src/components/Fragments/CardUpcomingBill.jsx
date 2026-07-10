import React from "react";
import Card from "../Elements/Card";
import CircularProgress from '@mui/material/CircularProgress'; 

function CardUpcomingBill(props) {
  const { data } = props;


  const isLoading = !data || data.length === 0;


  console.log("Data Bills API:", data);

  return (
    <>
      <Card
        title="Upcoming Bill"
        link="/bill"
        desc={
          isLoading ? (

            <div className="flex flex-col justify-center items-center h-full text-primary p-10">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              <div className="mt-2 text-sm font-bold">Loading Data</div>
            </div>
          ) : (

            <div className="flex flex-col justify-around h-full">
              {data.map((item, index) => (
                <div key={item.id || index} className="flex justify-between pt-3 pb-3">
                  <div className="flex">
                    <div className="bg-special-bg p-4 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs">{item.month}</span>
                      <span className="text-2xl font-bold">{item.date}</span>
                    </div>
                    <div className="ms-10 flex flex-col justify-center">
                      <div className="flex items-center gap-2">

                        {item.icon}
                        <span className="font-bold">{item.name}</span>
                      </div>
                      <span className="text-xs text-gray-03">Last Charge - {item.lastCharge}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold">
                      ${item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      />
    </>
  );
}

export default CardUpcomingBill;