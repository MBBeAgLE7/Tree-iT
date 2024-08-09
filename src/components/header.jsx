import React from 'react';

export default function Header() {
  return (
    <div className='header z-10 flex fixed w-[100%] h-auto bg-slate-500 justify-between shadow-md shadow-slate-500 border-b-[2px] border-slate-500 rounded-b-[5px]'>
        <div className='header-child-1 m-3 font-bold text-white text-[18px]'>
            <h1>Tree-iT</h1>
        </div>
        <div className='header-child-2 relative text-white right-1 m-3 font-bold'>
            <h1>Welcome!</h1>
        </div>
    </div>
  )
}
