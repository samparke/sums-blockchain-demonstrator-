"use client"

import {useAccount} from "wagmi"

export default function Dashboard() {
  const {isConnected} = useAccount()
  return (
   <div className='py-10'>
    {isConnected? (
      <div className="text-white">
      </div>
      ) : (
      <div className="text-black">
        Please connect wallet...
      </div>
      ) 
    }
    </div>
  );
}
