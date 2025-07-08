import AnimatedText from './components/animatedText';
import CardComp from './components/card';

export default function Home() {
  return <main className='py-2 min-h-screen flex flex-col gap-7 justify-center items-center px-4 text-center'>
  <h1 className='font-black text-3xl md:text-4xl'>
    <AnimatedText text={'Share Your Videos with the World'}/>
    
    </h1>
  <p className='text-lg md:text-xl text-gray-500 font-bold max-w-xl'>Upload, share, and discover amazing videos from creators everywhere</p>

  <div className='flex flex-col sm:flex-row gap-3'>
    <button className='py-2 px-6 bg-black text-white font-medium cursor-pointer rounded hover:bg-black/90 transition duration-100 ease-linear text-sm'>Upload Videos</button>
    <button className='py-2 px-6 bg-white text-black font-medium cursor-pointer rounded hover:bg-white/90 transition duration-100 ease-linear text-sm'>Browse Videos</button>
  </div>

  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-6xl px-4'>
    <CardComp 
      icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload h-12 w-12 text-purple-600 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>}
      title='Easy Upload'
      desc='Upload your videos quickly and easily with our simple interface'
    />
    <CardComp
      icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play h-12 w-12 text-blue-600 mb-2"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>}
      title='High Quality'
      desc='Watch videos in high quality with smooth streaming experience'
    />
    <CardComp
      icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-12 w-12 text-green-600 mb-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
      title='Community'
      desc='Join a community of creators and viewers sharing amazing content'
    />
  </div>
</main>

}


