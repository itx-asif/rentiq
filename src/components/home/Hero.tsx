import herobg from '@/assets/herobg.png'
import PropertySearch from './PropertySearch'
const Hero = () => {
    return (
      <section className="relative ">
    <div className="absolute inset-0 z-0">
  <div className="w-full h-full relative">
    <img 
      src={herobg} 
      alt="landscape" 
      className="w-full h-full object-cover object-bottom "
    />
    
    {/* Horizontal gradient overlay (left to right) */}
    <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-background/60"></div>
    
    {/* NEW: White vertical blur at bottom */}
    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/10 to-transparent pointer-events-none" />
  </div>
</div>

<div className="relative z-10 max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-foreground">
  <div className="max-w-3xl text-center m-auto">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 animate-fade-in">
      Turning your dream home into your new address
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-foreground/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      Your one-stop destination for real estate sale, purchase, and rent — start to finish.
    </p>
  </div>


          
        
          <PropertySearch/>
  
        </div>
      </section>
    )
  }
  
  export default Hero