import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, DollarSign, TrendingUp, TrendingDown, X, Droplet, ArrowRight, Building2, Activity, Users, BarChart3, Layers, FileText, Trophy, ShieldCheck, Lock, Clock, Coins, ArrowLeftRight, ExternalLink } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
interface DashboardProps {
  connected: boolean;
  kycVerified: boolean;
  verifyKYC: () => Promise<boolean>;
  walletAddress: string;
}
const receivables = [{
  name: 'Credit Receivables',
  apy: '10',
  backedBy: 'Nuclea Bank',
  description: 'Consumer credit-backed tokens with stable returns',
  color: 'bg-[#f0ebff]',
  borderColor: 'border-purple-200',
  icon: <TrendingUp size={24} className="text-purple-600" />
}, {
  name: 'Commercial Receivables',
  apy: '20',
  backedBy: 'Cielo Bank',
  description: 'Business invoices and commercial paper',
  color: 'bg-[#f0ebff]',
  borderColor: 'border-purple-200',
  icon: <Building2 size={24} className="text-purple-600" />
}, {
  name: 'Trade Finance Receivables',
  apy: '30',
  backedBy: 'Nuclea Bank',
  description: 'International trade and supply chain financing',
  color: 'bg-[#f0ebff]',
  borderColor: 'border-purple-200',
  icon: <DollarSign size={24} className="text-purple-600" />
}];
const vaults = [{
  name: 'Credit Receivable Vault',
  apy: '1',
  description: 'Deposit USDTr to earn yields backed by credit receivables',
  color: 'bg-[#f0ebff]',
  borderColor: 'border-purple-200',
  icon: <Lock size={24} className="text-purple-600" />,
  lockPeriod: '30 days minimum',
  riskLevel: 'Low',
  riskColor: 'text-green-600',
  riskBg: 'bg-green-50',
  riskBorder: 'border-green-200',
  receivables: [{
    type: 'Personal Loans',
    percentage: '45%',
    rating: 'A'
  }, {
    type: 'Auto Loans',
    percentage: '30%',
    rating: 'A+'
  }, {
    type: 'Credit Cards',
    percentage: '25%',
    rating: 'BBB+'
  }]
}, {
  name: 'Commercial Receivable Vault',
  apy: '2',
  description: 'Deposit USDTr to earn yields backed by commercial receivables',
  color: 'bg-[#f0ebff]',
  borderColor: 'border-purple-200',
  icon: <Lock size={24} className="text-purple-600" />,
  lockPeriod: '60 days minimum',
  riskLevel: 'Medium',
  riskColor: 'text-yellow-600',
  riskBg: 'bg-yellow-50',
  riskBorder: 'border-yellow-200',
  receivables: [{
    type: 'Invoice Financing',
    percentage: '50%',
    rating: 'A'
  }, {
    type: 'Commercial Paper',
    percentage: '35%',
    rating: 'A+'
  }, {
    type: 'Equipment Leasing',
    percentage: '15%',
    rating: 'A-'
  }]
}, {
  name: 'Trade Receivable Vault',
  apy: '3',
  description: 'Deposit USDTr to earn yields backed by trade finance receivables',
  color: 'bg-[#f0ebff]',
  borderColor: 'border-purple-200',
  icon: <Lock size={24} className="text-purple-600" />,
  lockPeriod: '90 days minimum',
  riskLevel: 'High',
  riskColor: 'text-red-600',
  riskBg: 'bg-red-50',
  riskBorder: 'border-red-200',
  receivables: [{
    type: 'Letters of Credit',
    percentage: '40%',
    rating: 'AA'
  }, {
    type: 'Supply Chain Finance',
    percentage: '35%',
    rating: 'A+'
  }, {
    type: 'Export Financing',
    percentage: '25%',
    rating: 'A'
  }]
}];
// Mock data for portfolio growth
const portfolioData = [{
  date: 'Jan 1',
  balance: 800
}, {
  date: 'Jan 5',
  balance: 850
}, {
  date: 'Jan 10',
  balance: 920
}, {
  date: 'Jan 15',
  balance: 980
}, {
  date: 'Jan 20',
  balance: 1050
}, {
  date: 'Jan 25',
  balance: 1120
}, {
  date: 'Jan 30',
  balance: 1180
}, {
  date: 'Feb 4',
  balance: 1250
}];
// Mock data for Rayls Points growth
const raylsPointsData = [{
  date: 'Jan 1',
  balance: 5000
}, {
  date: 'Jan 5',
  balance: 4850
}, {
  date: 'Jan 10',
  balance: 4650
}, {
  date: 'Jan 15',
  balance: 4400
}, {
  date: 'Jan 20',
  balance: 4100
}, {
  date: 'Jan 25',
  balance: 3800
}, {
  date: 'Jan 30',
  balance: 3500
}, {
  date: 'Feb 4',
  balance: 3200
}];
export const Dashboard: React.FC<DashboardProps> = ({
  connected,
  kycVerified,
  verifyKYC,
  walletAddress
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'invest' | 'faucet' | 'swap'>('portfolio');
  const [faucetAddress, setFaucetAddress] = useState('');
  const [faucetLoading, setFaucetLoading] = useState(false);
  const [faucetSuccess, setFaucetSuccess] = useState(false);
  const [swapAmount, setSwapAmount] = useState('');
  const [swapLoading, setSwapLoading] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [unclaimedRP, setUnclaimedRP] = useState(100);
  const usdtrBalance = 1250.0;
  const raylsPointsBalance = 5000.0;
  const swapRate = 0.5; // 1 RP = 0.5 USDTr
  const handleClaimRP = () => {
    setClaimLoading(true);
    // Simulate claim transaction
    setTimeout(() => {
      setClaimLoading(false);
      setClaimSuccess(true);
      setUnclaimedRP(0);
      setTimeout(() => setClaimSuccess(false), 3000);
    }, 1500);
  };
  const handleSwap = () => {
    if (!swapAmount || parseFloat(swapAmount) <= 0) return;
    setSwapLoading(true);
    // Simulate swap transaction
    setTimeout(() => {
      setSwapLoading(false);
      setSwapSuccess(true);
      setTimeout(() => setSwapSuccess(false), 5000);
      setSwapAmount('');
    }, 2000);
  };
  return <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#121212]">
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
      {/* Tabs */}
      <div className="bg-[#121212]">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex space-x-4 pt-4">
            <button onClick={() => setActiveTab('portfolio')} className={`py-2.5 px-5 font-medium rounded-full transition-all flex items-center space-x-2 ${activeTab === 'portfolio' ? 'bg-[#b388ff] text-white' : 'bg-transparent text-white hover:text-white hover:bg-gray-800/50'}`}>
              <Coins size={18} />
              <span>Portfolio</span>
            </button>
            <button onClick={() => setActiveTab('swap')} className={`py-2.5 px-5 font-medium rounded-full transition-all flex items-center space-x-2 ${activeTab === 'swap' ? 'bg-[#b388ff] text-white' : 'bg-transparent text-white hover:text-white hover:bg-gray-800/50'}`}>
              <ArrowLeftRight size={18} />
              <span>Swap</span>
            </button>
            <button onClick={() => setActiveTab('invest')} className={`py-2.5 px-5 font-medium rounded-full transition-all flex items-center space-x-2 ${activeTab === 'invest' ? 'bg-[#b388ff] text-white' : 'bg-transparent text-white hover:text-white hover:bg-gray-800/50'}`}>
              <Lock size={18} />
              <span>Invest</span>
            </button>
            <button onClick={() => setActiveTab('faucet')} className={`py-2.5 px-5 font-medium rounded-full transition-all flex items-center space-x-2 ${activeTab === 'faucet' ? 'bg-[#b388ff] text-white' : 'bg-transparent text-white hover:text-white hover:bg-gray-800/50'}`}>
              <Droplet size={18} />
              <span>Faucet</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl px-6 py-8">
        {/* Portfolio Tab Content */}
        {activeTab === 'portfolio' && <div className="space-y-8">
            {/* USDTr Card */}
            <div className="bg-[#f0ebff] border border-purple-200 rounded-xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-2">
                    <Coins size={24} className="text-purple-600 mr-2" />
                    <h3 className="text-lg font-semibold text-black">
                      Your Portfolio
                    </h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-black mb-1">
                      {usdtrBalance.toFixed(2)} USDTr
                    </div>
                    <p className="text-gray-600 text-sm">Available Balance</p>
                  </div>
                  <p className="text-black text-sm mb-4">
                    Earn USDTr through swapping Rayls Points and then investing
                    in receivable vaults.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => setActiveTab('swap')} className="flex-1 bg-[#b388ff] hover:bg-[#a070e9] text-white font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center">
                      <ArrowLeftRight size={16} className="mr-2" />
                      Swap
                    </button>
                    <button onClick={() => setActiveTab('invest')} className="flex-1 bg-[#b388ff] hover:bg-[#a070e9] text-white font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center">
                      <Lock size={16} className="mr-2" />
                      Invest
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-black">
                      Balance Growth
                    </h4>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp size={16} className="mr-1" />
                      <span>+56.3%</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={portfolioData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#b388ff" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#b388ff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0d5ff" />
                      <XAxis dataKey="date" tick={{
                    fill: '#666',
                    fontSize: 12
                  }} stroke="#e0d5ff" />
                      <YAxis tick={{
                    fill: '#666',
                    fontSize: 12
                  }} stroke="#e0d5ff" />
                      <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0d5ff',
                    borderRadius: '8px'
                  }} formatter={(value: number) => [`${value.toFixed(2)} USDTr`, 'Balance']} />
                      <Area type="monotone" dataKey="balance" stroke="#b388ff" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* Rayls Points Card */}
            <div className="bg-[#f0ebff] border border-purple-200 rounded-xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-2">
                    <Trophy size={24} className="text-purple-600 mr-2" />
                    <h3 className="text-lg font-semibold text-black">
                      Rayls Points
                    </h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-black mb-1">
                      {raylsPointsBalance.toFixed(2)} RP
                    </div>
                    <p className="text-gray-600 text-sm">Available Balance</p>
                  </div>
                  <p className="text-black text-sm mb-4">
                    Complete quests{' '}
                    <a href="https://app.fuul.xyz/landing/rayls-loyalty-rewards" target="_blank" rel="noopener noreferrer" className="text-[#b388ff] hover:text-[#a070e9] underline font-medium">
                      on Fuul
                    </a>{' '}
                    to earn Rayls Points that you can swap for USDTr.
                  </p>
                  {/* Claim Component */}
                  {unclaimedRP > 0 && !claimSuccess && <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Trophy size={20} className="text-[#b388ff] mr-2" />
                        <span className="text-black font-medium">
                          You have 100 RP to claim from your recent Fuul quests!
                        </span>
                      </div>
                      <button onClick={handleClaimRP} disabled={claimLoading} className="bg-[#b388ff] hover:bg-[#a070e9] text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                        {claimLoading ? <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            Claiming...
                          </> : 'Claim'}
                      </button>
                    </div>}
                  {claimSuccess && <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                      <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-800 font-medium">
                          Successfully claimed!
                        </p>
                        <p className="text-green-700 text-sm">
                          100 RP has been added to your balance.
                        </p>
                      </div>
                    </div>}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-black">
                      Balance Growth
                    </h4>
                    <div className="flex items-center text-red-600 text-sm">
                      <TrendingDown size={16} className="mr-1" />
                      <span>-36.0%</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={raylsPointsData}>
                      <defs>
                        <linearGradient id="colorRaylsPoints" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#b388ff" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#b388ff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0d5ff" />
                      <XAxis dataKey="date" tick={{
                    fill: '#666',
                    fontSize: 12
                  }} stroke="#e0d5ff" />
                      <YAxis tick={{
                    fill: '#666',
                    fontSize: 12
                  }} stroke="#e0d5ff" />
                      <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0d5ff',
                    borderRadius: '8px'
                  }} formatter={(value: number) => [`${value.toFixed(2)} RP`, 'Balance']} />
                      <Area type="monotone" dataKey="balance" stroke="#b388ff" strokeWidth={2} fillOpacity={1} fill="url(#colorRaylsPoints)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>}
        {/* Swap Tab Content */}
        {activeTab === 'swap' && <div className="bg-[#f0ebff] rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-[#b388ff]/20 p-3 rounded-lg mr-4">
                <ArrowLeftRight size={32} className="text-[#b388ff]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Swap Rayls Points to USDTr
                </h2>
                <p className="text-gray-600 text-sm">
                  Convert your earned Rayls Points to USDTr tokens
                </p>
              </div>
            </div>
            {/* Info Banner */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex items-start">
              <Trophy size={20} className="text-[#b388ff] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-purple-900 font-medium mb-1">
                  Earn Rayls Points on Fuul
                </p>
                <p className="text-purple-800 text-sm mb-2">
                  You earn Rayls Points through completing quests on Fuul, which
                  are then swapped for USDTr.
                </p>
                <a href="https://fuul.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#b388ff] hover:text-[#a070e9] text-sm font-medium transition-colors">
                  Visit Fuul
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
            {swapSuccess && <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
                <CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">Swap Successful!</p>
                  <p className="text-green-700 text-sm">
                    Your USDTr tokens will appear in your wallet shortly.
                  </p>
                </div>
              </div>}
            {/* Balance Display */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
                <p className="text-gray-600 text-sm mb-1">
                  Rayls Points Balance
                </p>
                <p className="text-2xl font-bold text-black">
                  {raylsPointsBalance.toFixed(2)} RP
                </p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
                <p className="text-gray-600 text-sm mb-1">USDTr Balance</p>
                <p className="text-2xl font-bold text-black">
                  {usdtrBalance.toFixed(2)} USDTr
                </p>
              </div>
            </div>
            {/* Swap Interface */}
            <div className="space-y-4 mb-6">
              {/* From Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="bg-white border border-purple-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <input type="number" value={swapAmount} onChange={e => setSwapAmount(e.target.value)} placeholder="0.00" className="text-2xl font-bold text-black outline-none bg-transparent w-full" />
                    <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-lg">
                      <Trophy size={20} className="text-[#b388ff]" />
                      <span className="font-semibold text-black">RP</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Balance: {raylsPointsBalance.toFixed(2)} RP</span>
                    <button onClick={() => setSwapAmount(raylsPointsBalance.toString())} className="text-[#b388ff] hover:text-[#a070e9] font-medium">
                      MAX
                    </button>
                  </div>
                </div>
              </div>
              {/* Arrow Icon */}
              <div className="flex justify-center">
                <div className="bg-white border border-purple-200 rounded-full p-2">
                  <ArrowLeftRight size={24} className="text-[#b388ff]" />
                </div>
              </div>
              {/* To Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To (estimated)
                </label>
                <div className="bg-gray-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-2xl font-bold text-gray-700">
                      {swapAmount ? (parseFloat(swapAmount) * swapRate).toFixed(2) : '0.00'}
                    </div>
                    <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-lg">
                      <DollarSign size={20} className="text-[#b388ff]" />
                      <span className="font-semibold text-black">USDTr</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Balance: {usdtrBalance.toFixed(2)} USDTr
                  </p>
                </div>
              </div>
            </div>
            {/* Exchange Rate Info */}
            <div className="bg-white/50 rounded-lg p-3 mb-6 border border-purple-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Exchange Rate</span>
                <span className="text-black font-medium">
                  1 RP = {swapRate} USDTr
                </span>
              </div>
            </div>
            {/* Swap Button */}
            <button onClick={handleSwap} disabled={!swapAmount || parseFloat(swapAmount) <= 0 || parseFloat(swapAmount) > raylsPointsBalance || swapLoading} className="w-full bg-[#b388ff] hover:bg-[#a070e9] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {swapLoading ? <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Swapping...
                </> : <>
                  Swap Tokens
                  <ArrowLeftRight size={16} className="ml-2" />
                </>}
            </button>
            {/* Note */}
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Swaps from Rayls Points to USDTr are
                one-way only. You cannot convert USDTr back to Rayls Points.
              </p>
            </div>
          </div>}
        {/* Invest Tab Content */}
        {activeTab === 'invest' && <>
            {/* Vault Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Receivable Vaults - Deposit & Earn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vaults.map((vault, index) => <div key={index} className={`${vault.color} border ${vault.borderColor} rounded-xl p-6 hover:shadow-lg hover:shadow-[#b388ff]/10 transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-white/50 p-3 rounded-lg">
                        {vault.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-black">
                          {vault.apy}%
                        </div>
                        <div className="text-xs text-black">APY</div>
                      </div>
                    </div>
                    {/* Risk Level Badge */}
                    <div className={`inline-flex items-center ${vault.riskBg} ${vault.riskBorder} border px-3 py-1 rounded-full mb-3`}>
                      <ShieldCheck size={14} className={`${vault.riskColor} mr-1`} />
                      <span className={`text-xs font-semibold ${vault.riskColor}`}>
                        {vault.riskLevel} Risk
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black">
                      {vault.name}
                    </h3>
                    <p className="text-black text-sm mb-4">
                      {vault.description}
                    </p>
                    {/* Underlying Receivables */}
                    <div className="bg-white/50 rounded-lg p-3 mb-4 border border-purple-200">
                      <div className="text-xs font-semibold text-gray-700 mb-2">
                        Underlying Receivables
                      </div>
                      <div className="space-y-2">
                        {vault.receivables.map((receivable, idx) => <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-gray-700">
                              {receivable.type}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-[#b388ff] font-semibold">
                                {receivable.percentage}
                              </span>
                              <span className="text-gray-500 text-[10px]">
                                {receivable.rating}
                              </span>
                            </div>
                          </div>)}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-black mb-4">
                      <Clock size={14} className="mr-1" />
                      <span>{vault.lockPeriod}</span>
                    </div>
                    <button onClick={() => {
                const vaultType = index === 0 ? 'credit' : index === 1 ? 'commercial' : 'trade';
                navigate(`/vault/${vaultType}`);
              }} className="w-full bg-[#b388ff] hover:bg-[#a070e9] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center group">
                      Deposit Tokens
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>)}
              </div>
            </div>
          </>}
        {/* Faucet Tab Content */}
        {activeTab === 'faucet' && <div className="max-w-2xl mx-auto">
            <div className="bg-[#f0ebff] rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-[#b388ff]/20 p-3 rounded-lg mr-4">
                  <Droplet size={32} className="text-[#b388ff]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">
                    Rayls Testnet Faucet
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Get free rETH tokens to interact with the testnet
                  </p>
                </div>
              </div>
              {faucetSuccess && <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-medium">Success!</p>
                    <p className="text-green-700 text-sm">
                      100 rETH has been sent to your wallet. It may take a few
                      moments to appear.
                    </p>
                  </div>
                </div>}
              <div className="mb-6">
                <label htmlFor="faucetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet Address
                </label>
                <input type="text" id="faucetAddress" value={faucetAddress} onChange={e => setFaucetAddress(e.target.value)} placeholder="0x..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#b388ff] focus:border-[#b388ff] outline-none text-black" />
                <p className="text-gray-500 text-xs mt-2">
                  Enter your wallet address to receive 100 rETH tokens
                </p>
              </div>
              <button onClick={() => {
            if (!faucetAddress) return;
            setFaucetLoading(true);
            // Simulate API call
            setTimeout(() => {
              setFaucetLoading(false);
              setFaucetSuccess(true);
              setTimeout(() => setFaucetSuccess(false), 5000);
            }, 2000);
          }} disabled={!faucetAddress || faucetLoading} className="w-full bg-[#b388ff] hover:bg-[#a070e9] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                {faucetLoading ? <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Sending rETH...
                  </> : <>
                    Request rETH
                    <Droplet size={16} className="ml-2" />
                  </>}
              </button>
              <div className="mt-6 bg-white/50 rounded-lg p-4">
                <h3 className="font-semibold text-black mb-2">Faucet Limits</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 100 rETH per request</li>
                  <li>• Maximum 1 request per 24 hours</li>
                  <li>• Testnet tokens have no real value</li>
                </ul>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};