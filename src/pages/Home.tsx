import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
interface HomeProps {
  connected?: boolean;
  connectWallet?: () => Promise<string | null>;
  walletAddress?: string;
}
export const Home: React.FC<HomeProps> = ({
  connectWallet
}) => {
  const navigate = useNavigate();
  const handleConnectWallet = async () => {
    if (connectWallet) {
      await connectWallet();
    }
    navigate('/dashboard');
  };
  // Generate random properties for each coin - only on right side
  const coins = Array.from({
    length: 15
  }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    duration: 1.5 + Math.random() * 1,
    xPosition: 60 + Math.random() * 35,
    rotation: Math.random() * 720 - 360,
    scale: 0.5 + Math.random() * 0.5
  }));
  return <div className="w-full h-screen bg-[#e7fb3c] overflow-hidden">
      <div className="relative h-full">
        {/* Purple arc elements with flowing bands */}
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 right-0 w-full h-[70vh] bg-[#c4b7f0] rounded-t-full"></div>
          <div className="absolute bottom-[-5vh] left-0 right-0 w-full h-[60vh] bg-[#b9aceb] opacity-90 rounded-t-full"></div>
          <div className="absolute bottom-[-15vh] left-0 right-0 w-full h-[50vh] bg-[#ae9fe5] opacity-80 rounded-t-full"></div>
          <div className="absolute bottom-[-25vh] left-0 right-0 w-full h-[40vh] bg-[#a393e0] opacity-70 rounded-t-full"></div>
          <div className="absolute bottom-[-35vh] left-0 right-0 w-full h-[30vh] bg-[#9887da] opacity-60 rounded-t-full"></div>
        </div>
        {/* Falling coins animation */}
        <div className="absolute inset-0 z-5">
          {coins.map(coin => <motion.div key={coin.id} drag dragElastic={0.2} dragConstraints={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }} whileHover={{
          scale: 1.1,
          cursor: 'grab'
        }} whileTap={{
          scale: 0.95,
          cursor: 'grabbing'
        }} className="absolute" style={{
          left: `${coin.xPosition}%`,
          top: '-200px'
        }} initial={{
          y: -200,
          rotate: 0
        }} animate={{
          y: window.innerHeight + 100,
          rotate: coin.rotation
        }} transition={{
          duration: coin.duration,
          delay: coin.delay,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 0
        }}>
              <motion.div style={{
            transform: `scale(${coin.scale})`
          }}>
                <div className="relative w-20 h-20" style={{
              transform: 'perspective(1000px) rotateX(25deg) rotateY(-15deg)',
              transformStyle: 'preserve-3d'
            }}>
                  {/* Coin edge */}
                  <div className="absolute inset-0 rounded-full" style={{
                background: 'linear-gradient(135deg, #b8860b 0%, #daa520 50%, #b8860b 100%)',
                transform: 'translateZ(-8px)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
              }}></div>
                  {/* Main coin face */}
                  <div className="absolute inset-0 rounded-full overflow-hidden" style={{
                background: 'linear-gradient(135deg, #f4c430 0%, #daa520 30%, #b8860b 60%, #daa520 100%)',
                boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.3), 0 10px 20px rgba(0,0,0,0.3)',
                transform: 'translateZ(0)'
              }}>
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)'
                }}></div>
                    {/* Concentric rings */}
                    <div className="absolute inset-[8%] rounded-full border-2 border-[#b8860b]/30"></div>
                    <div className="absolute inset-[12%] rounded-full border border-[#b8860b]/20"></div>
                    <div className="absolute inset-[15%] rounded-full border-2 border-[#b8860b]/40"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>)}
        </div>
        {/* Main content - now full width */}
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Earn Rayls Points with the new Testnet!
            </h1>
            <p className="text-lg text-black mb-8 max-w-md">
              Connect your wallet to explore the future of finance through
              investing in high-interest receivable vaults.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={handleConnectWallet} className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-full flex items-center justify-center group">
                Connect wallet{' '}
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="mt-4 text-center sm:text-left">
              <p className="text-sm text-black">
                No wallet? <span>Find out about wallets </span>
                <a href="#" className="text-black underline hover:opacity-80">
                  here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};