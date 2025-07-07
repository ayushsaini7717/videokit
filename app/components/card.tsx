type Card={
    title: string,
    desc: string,
    icon: any
}
const CardComp=({title,desc,icon}: Card)=>{
    return <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:max-w-[18vw] border border-gray-300 rounded p-4 sm:p-5 bg-white shadow-sm">
        <div>{icon}</div>
        <div className="font-bold text-lg mt-2">{title}</div>
        <div className="font-normal text-sm text-gray-500 mt-1">{desc}</div>
  </div>
  
}

export default CardComp;