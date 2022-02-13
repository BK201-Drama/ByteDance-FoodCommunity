import React, { useEffect } from "react";

export default function AddMenu () {
  
  useEffect(() => {
    
  }, []);

  return (
    <>
      {
        [1,1,11,1,1,11,1,1,1,1,1,1].map(() => {
          return (
            <div>addMenu</div>
          )
        })
      }
    </>
  );
}