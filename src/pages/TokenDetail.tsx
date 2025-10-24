import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, TrendingUp, DollarSign, Users, ShieldCheck, Info, CheckCircle, AlertCircle } from 'lucide-react';
interface TokenData {
  name: string;
  apy: string;
  backedBy: string;
  description: string;
  icon: React.ReactNode;
  maxSupply: string;
  currentSupply: string;
  price: string;
  minPurchase: string;
  bankInfo: {
    name: string;
    rating: string;
    founded: string;
    headquarters: string;
    assets: string;
  };
  receivables: Array<{
    type: string;
    percentage: string;
    avgMaturity: string;
    creditRating: string;
  }>;
  tokenomics: {
    totalIssued: string;
    circulation: string;
    holders: string;
  };
}
const tokenDatabase: Record<string, TokenData> = {
  credit: {
    name: 'Credit Receivables',
    apy: '10',
    backedBy: 'Nuclea Bank',
    description: 'Consumer credit-backed tokens with stable returns',
    icon: <TrendingUp size={32} className="text-purple-600" />,
    maxSupply: '10,000,000',
    currentSupply: '6,847,392',
    price: '1.00',
    minPurchase: '100',
    bankInfo: {
      name: 'Nuclea Bank',
      rating: 'AA+',
      founded: '1995',
      headquarters: 'New York, USA',
      assets: '$45.2B'
    },
    receivables: [{
      type: 'Personal Loans',
      percentage: '45%',
      avgMaturity: '36 months',
      creditRating: 'A'
    }, {
      type: 'Auto Loans',
      percentage: '30%',
      avgMaturity: '48 months',
      creditRating: 'A+'
    }, {
      type: 'Credit Cards',
      percentage: '25%',
      avgMaturity: '24 months',
      creditRating: 'BBB+'
    }],
    tokenomics: {
      totalIssued: '6,847,392',
      circulation: '6,234,891',
      holders: '2,847'
    }
  },
  commercial: {
    name: 'Commercial Receivables',
    apy: '20',
    backedBy: 'Cielo Bank',
    description: 'Business invoices and commercial paper',
    icon: <Building2 size={32} className="text-purple-600" />,
    maxSupply: '25,000,000',
    currentSupply: '18,234,567',
    price: '1.00',
    minPurchase: '500',
    bankInfo: {
      name: 'Cielo Bank',
      rating: 'AA',
      founded: '1987',
      headquarters: 'London, UK',
      assets: '$62.8B'
    },
    receivables: [{
      type: 'Invoice Financing',
      percentage: '50%',
      avgMaturity: '90 days',
      creditRating: 'A'
    }, {
      type: 'Commercial Paper',
      percentage: '35%',
      avgMaturity: '180 days',
      creditRating: 'A+'
    }, {
      type: 'Equipment Leasing',
      percentage: '15%',
      avgMaturity: '60 months',
      creditRating: 'A-'
    }],
    tokenomics: {
      totalIssued: '18,234,567',
      circulation: '17,892,341',
      holders: '4,123'
    }
  },
  trade: {
    name: 'Trade Finance Receivables',
    apy: '30',
    backedBy: 'Nuclea Bank',
    description: 'International trade and supply chain financing',
    icon: <DollarSign size={32} className="text-purple-600" />,
    maxSupply: '50,000,000',
    currentSupply: '32,456,789',
    price: '1.00',
    minPurchase: '1000',
    bankInfo: {
      name: 'Nuclea Bank',
      rating: 'AA+',
      founded: '1995',
      headquarters: 'New York, USA',
      assets: '$45.2B'
    },
    receivables: [{
      type: 'Letters of Credit',
      percentage: '40%',
      avgMaturity: '120 days',
      creditRating: 'AA'
    }, {
      type: 'Supply Chain Finance',
      percentage: '35%',
      avgMaturity: '90 days',
      creditRating: 'A+'
    }, {
      type: 'Export Financing',
      percentage: '25%',
      avgMaturity: '180 days',
      creditRating: 'A'
    }],
    tokenomics: {
      totalIssued: '32,456,789',
      circulation: '31,234,567',
      holders: '5,892'
    }
  }
};
export const TokenDetail: React.FC = () => {
  const navigate = useNavigate();
  const {
    tokenType
  } = useParams<{
    tokenType: string;
  }>();
  const [amount, setAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const token = tokenDatabase[tokenType || 'credit'];
  if (!token) {
    return <div>Token not found</div>;
  }
  const handleAmountChange = (value: string) => {
    setAmount(value);
    const usd = (parseFloat(value) || 0) * parseFloat(token.price);
    setUsdAmount(usd.toFixed(2));
  };
  const handleUsdChange = (value: string) => {
    setUsdAmount(value);
    const tokens = (parseFloat(value) || 0) / parseFloat(token.price);
    setAmount(tokens.toFixed(2));
  };
  const handlePurchase = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setAmount('');
      setUsdAmount('');
    }, 3000);
  };
  const percentageSold = parseFloat(token.currentSupply.replace(/,/g, '')) / parseFloat(token.maxSupply.replace(/,/g, '')) * 100;
  return <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#121212] border-b border-gray-800">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/Rayls_Logo_Gradient.svg" alt="Rayls" className="h-8" />
              <span className="text-white text-sm font-light tracking-wider uppercase italic">
                testnet
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-gray-800 text-[#e7fb3c] text-xs font-medium px-3 py-1.5 rounded-full">
                0x1a2b...9c8d
              </span>
              <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Back Button */}
      <div className="container mx-auto max-w-6xl px-6 py-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center text-white hover:text-gray-200 transition-colors mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>
        {/* Success Message */}
        {showConfirmation && <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 mb-6 flex items-start">
            <CheckCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-medium">Purchase Successful!</p>
              <p className="text-green-300 text-sm">
                Your {amount} {token.name} tokens will appear in your wallet
                shortly.
              </p>
            </div>
          </div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Token Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Token Header */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-900/30 p-4 rounded-xl">
                    {token.icon}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-black mb-1">
                      {token.name}
                    </h1>
                    <p className="text-gray-700">{token.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-[#b388ff]">
                    {token.apy}%
                  </div>
                  <div className="text-gray-700 text-sm">APY</div>
                </div>
              </div>
              {/* Token Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-purple-200">
                <div>
                  <div className="text-gray-700 text-sm mb-1">Price</div>
                  <div className="text-black text-xl font-bold">
                    ${token.price}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">Max Supply</div>
                  <div className="text-black text-xl font-bold">
                    {token.maxSupply}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">
                    Current Supply
                  </div>
                  <div className="text-black text-xl font-bold">
                    {token.currentSupply}
                  </div>
                </div>
              </div>
              {/* Supply Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-700 mb-2">
                  <span>Supply Progress</span>
                  <span>{percentageSold.toFixed(1)}% Sold</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-[#b388ff] h-2 rounded-full transition-all duration-500" style={{
                  width: `${percentageSold}%`
                }}></div>
                </div>
              </div>
            </div>
            {/* Bank Information */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <Building2 size={24} className="text-[#b388ff] mr-3" />
                <h2 className="text-xl font-bold text-black">Issuing Bank</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-700 text-sm mb-1">Bank Name</div>
                  <div className="text-black font-medium">
                    {token.bankInfo.name}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">
                    Credit Rating
                  </div>
                  <div className="text-black font-medium flex items-center">
                    <ShieldCheck size={16} className="text-green-600 mr-1" />
                    {token.bankInfo.rating}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">Founded</div>
                  <div className="text-black font-medium">
                    {token.bankInfo.founded}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">Headquarters</div>
                  <div className="text-black font-medium">
                    {token.bankInfo.headquarters}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">Total Assets</div>
                  <div className="text-black font-medium">
                    {token.bankInfo.assets}
                  </div>
                </div>
              </div>
            </div>
            {/* Underlying Receivables */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <Info size={24} className="text-[#b388ff] mr-3" />
                <h2 className="text-xl font-bold text-black">
                  Underlying Receivables
                </h2>
              </div>
              <div className="space-y-4">
                {token.receivables.map((receivable, index) => <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-black font-semibold">
                          {receivable.type}
                        </h3>
                        <div className="text-gray-600 text-sm mt-1">
                          Avg. Maturity: {receivable.avgMaturity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#b388ff] font-bold text-lg">
                          {receivable.percentage}
                        </div>
                        <div className="text-gray-600 text-xs">
                          of portfolio
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <ShieldCheck size={14} className="text-green-600 mr-1" />
                      <span className="text-gray-700">
                        Credit Rating: {receivable.creditRating}
                      </span>
                    </div>
                  </div>)}
              </div>
            </div>
            {/* Tokenomics */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <Users size={24} className="text-[#b388ff] mr-3" />
                <h2 className="text-xl font-bold text-black">Tokenomics</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-gray-700 text-sm mb-1">Total Issued</div>
                  <div className="text-black text-lg font-bold">
                    {token.tokenomics.totalIssued}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">
                    In Circulation
                  </div>
                  <div className="text-black text-lg font-bold">
                    {token.tokenomics.circulation}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">
                    Token Holders
                  </div>
                  <div className="text-black text-lg font-bold">
                    {token.tokenomics.holders}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Purchase Widget */}
          <div className="lg:col-span-1">
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200 sticky top-6">
              <h2 className="text-xl font-bold text-black mb-6">
                Buy {token.name}
              </h2>
              {/* Amount Input */}
              <div className="mb-4">
                <label className="text-gray-700 text-sm mb-2 block">
                  Token Amount
                </label>
                <div className="relative">
                  <input type="number" value={amount} onChange={e => handleAmountChange(e.target.value)} placeholder="0.00" className="w-full bg-white border border-purple-200 rounded-lg px-4 py-3 text-black text-lg focus:border-[#b388ff] focus:outline-none" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                    Tokens
                  </span>
                </div>
              </div>
              {/* USD Amount Input */}
              <div className="mb-4">
                <label className="text-gray-700 text-sm mb-2 block">
                  rETH Amount
                </label>
                <div className="relative">
                  <input type="number" value={usdAmount} onChange={e => handleUsdChange(e.target.value)} placeholder="0.00" className="w-full bg-white border border-purple-200 rounded-lg px-4 py-3 text-black text-lg focus:border-[#b388ff] focus:outline-none" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                    rETH
                  </span>
                </div>
              </div>
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {['100', '500', '1000', '5000'].map(preset => <button key={preset} onClick={() => handleUsdChange(preset)} className="bg-white hover:bg-gray-50 text-gray-700 text-sm py-2 rounded-lg transition-colors border border-purple-200">
                    ${preset}
                  </button>)}
              </div>
              {/* Purchase Summary */}
              <div className="bg-white rounded-lg p-4 mb-6 space-y-2 border border-purple-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Price per token</span>
                  <span className="text-black">${token.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Minimum purchase</span>
                  <span className="text-black">{token.minPurchase} tokens</span>
                </div>
                <div className="border-t border-purple-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total</span>
                    <span className="text-black font-bold text-lg">
                      ${usdAmount || '0.00'} rETH
                    </span>
                  </div>
                </div>
              </div>
              {/* Warning */}
              {amount && parseFloat(amount) < parseFloat(token.minPurchase) && <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4 flex items-start">
                  <AlertCircle size={16} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-800 text-xs">
                    Minimum purchase is {token.minPurchase} tokens
                  </p>
                </div>}
              {/* Purchase Button */}
              <button onClick={handlePurchase} disabled={!amount || parseFloat(amount) < parseFloat(token.minPurchase) || showConfirmation} className="w-full bg-[#b388ff] hover:bg-[#a070e9] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Buy Now
              </button>
              <p className="text-gray-600 text-xs text-center mt-4">
                By purchasing, you agree to the terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};