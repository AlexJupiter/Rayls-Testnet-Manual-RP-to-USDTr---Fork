import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LockIcon, Building2Icon } from 'lucide-react';
interface CreateAttestationProps {
  walletAddress?: string;
}
export const CreateAttestation: React.FC<CreateAttestationProps> = ({
  walletAddress = ''
}) => {
  const navigate = useNavigate();
  const truncatedAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : '';
  const handleCentralizedExchange = () => {
    // Navigate back to dashboard with attestations listed
    navigate('/dashboard', {
      state: {
        hasAttestations: true
      }
    });
  };
  const handleMicrodeposits = () => {
    // Navigate back to dashboard with success modal
    navigate('/dashboard', {
      state: {
        showSuccessModal: true,
        hasAttestations: true
      }
    });
  };
  return <div className="min-h-screen bg-[#121212] text-white">
      <div className="p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header - same as Dashboard */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <img src="/Rayls_Logo_Gradient.svg" alt="Rayls Logo" className="h-10" />
            </div>
            <div className="flex items-center space-x-3">
              {walletAddress && <span className="bg-gray-800 text-[#e7fb3c] text-xs font-medium px-3 py-1.5 rounded-full">
                  {truncatedAddress}
                </span>}
              <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                Log Out
              </button>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* Main content */}
            <div className="bg-[#f0ebff] text-black relative overflow-hidden rounded-xl p-8">
              <h1 className="text-2xl font-bold mb-4">Create attestation</h1>
              <p className="text-gray-600 mb-8">
                Select an attestation method to enable transactions on the Rayls
                blockchain. Each method has different privacy implications and
                processing times.
              </p>
              <div className="space-y-5">
                {/* Microdeposits Option */}
                <button onClick={handleMicrodeposits} className="w-full group bg-white border border-gray-200 rounded-lg p-5 hover:bg-white/90 transition-colors shadow-sm block hover:shadow-[0_0_15px_rgba(179,136,255,0.3)] transition-all duration-300 text-left">
                  <div className="flex items-start">
                    <div className="bg-[#b388ff]/30 p-3 rounded-lg mr-4 flex-shrink-0">
                      <div size={24} className="text-[#b388ff]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        Microdeposits
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Rayls accesses public banking information through small
                        test deposits.
                      </p>
                      <div className="text-gray-500 text-xs">
                        Process takes 1-2 days to complete
                      </div>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 self-center group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                {/* Open Banking Option */}
                <button className="w-full group bg-white border border-gray-200 rounded-lg p-5 hover:bg-white/90 transition-colors shadow-sm block hover:shadow-[0_0_15px_rgba(179,136,255,0.3)] transition-all duration-300 text-left">
                  <div className="flex items-start">
                    <div className="bg-[#b388ff]/30 p-3 rounded-lg mr-4 flex-shrink-0">
                      <LockIcon size={24} className="text-[#b388ff]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        Open Banking
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Rayls accesses private banking information through
                        secure APIs.
                      </p>
                      <div className="text-gray-500 text-xs">
                        Process is instant
                      </div>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 self-center group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                {/* Centralized Exchange Option */}
                <button onClick={handleCentralizedExchange} className="w-full group bg-white border border-gray-200 rounded-lg p-5 hover:bg-white/90 transition-colors shadow-sm block hover:shadow-[0_0_15px_rgba(179,136,255,0.3)] transition-all duration-300 text-left">
                  <div className="flex items-start">
                    <div className="bg-[#b388ff]/30 p-3 rounded-lg mr-4 flex-shrink-0">
                      <Building2Icon size={24} className="text-[#b388ff]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        Centralized Exchange
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Rayls accesses zero private information, but KYC is
                        carried out by Coinbase or Binance.
                      </p>
                      <div className="text-gray-500 text-xs">
                        Process can take hours to days
                      </div>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 self-center group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
              <div className="mt-8">
                <button onClick={() => navigate('/dashboard')} className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg flex items-center transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};