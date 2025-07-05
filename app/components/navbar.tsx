const Navbar=()=>{
    return <div className="w-full h-17 border-b border-gray-300 flex items-center justify-between">
        <div className="flex gap-2 items-center pl-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play h-8 w-8 text-purple-600"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
            <h1 className="font-bold text-2xl">VideoKit</h1>
        </div>
        <div className="pr-4 flex gap-2">
            <button className="font-medium hover:bg-gray-100 py-2 px-4 cursor-pointer rounded transition duration-100 ease-linear text-sm">Login</button>
            <button className="py-2 px-4 bg-black text-white font-medium cursor-pointer rounded hover:bg-black/90 transition duration-100 ease-linear text-sm">Signup</button>
        </div>
    </div>
}
export default Navbar;