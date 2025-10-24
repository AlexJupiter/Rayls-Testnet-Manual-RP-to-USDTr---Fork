import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
interface ValidateMicrodepositsProps {
  walletAddress?: string;
}
export const ValidateMicrodeposits: React.FC<ValidateMicrodepositsProps> = ({
  walletAddress = ''
}) => {
  const navigate = useNavigate();
  const [deposit1, setDeposit1] = useState('');
  const [deposit2, setDeposit2] = useState('');
  const truncatedAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : '';
  const handleCancel = () => {
    navigate('/dashboard');
  };
  const handleConfirm = () => {
    // This would handle the validation logic in a real implementation
    console.log('Validating deposits:', deposit1, deposit2);
    // For now, just return to dashboard
    navigate('/dashboard');
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
              <h1 className="text-2xl font-bold mb-4">
                Validate microdeposits
              </h1>
              <p className="text-gray-600 mb-8">
                After requesting the microdeposits, you then need to wait 1-2
                days for the payments to appear in your account. Once they've
                appeared, input the amounts below.
              </p>
              <div className="space-y-6">
                {/* First deposit input */}
                <div>
                  <label htmlFor="deposit1" className="block text-sm font-medium text-gray-700 mb-2">
                    First microdeposit amount ($)
                  </label>
                  <input type="text" id="deposit1" value={deposit1} onChange={e => setDeposit1(e.target.value)} placeholder="0.00" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#b388ff] focus:border-[#b388ff] outline-none" />
                </div>
                {/* Second deposit input */}
                <div>
                  <label htmlFor="deposit2" className="block text-sm font-medium text-gray-700 mb-2">
                    Second microdeposit amount ($)
                  </label>
                  <input type="text" id="deposit2" value={deposit2} onChange={e => setDeposit2(e.target.value)} placeholder="0.00" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#b388ff] focus:border-[#b388ff] outline-none" />
                </div>
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <button onClick={handleCancel} className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg flex items-center transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleConfirm} className="bg-[#b388ff] hover:bg-[#a070e9] text-white font-medium py-3 px-6 rounded-lg flex items-center transition-colors">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};