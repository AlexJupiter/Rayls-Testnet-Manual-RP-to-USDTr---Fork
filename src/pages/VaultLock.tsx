import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock, TrendingUp, Clock, AlertCircle, CheckCircle, Info, ShieldCheck } from 'lucide-react';
interface VaultData {
  name: string;
  apy: string;
  lockPeriod: string;
  minLockDays: number;
  description: string;
  tokenType: string;
  riskLevel: string;
  riskColor: string;
  riskBg: string;
  riskBorder: string;
  receivables: Array<{
    type: string;
    percentage: string;
    rating: string;
  }>;
}
const vaultDatabase: Record<string, VaultData> = {
  credit: {
    name: 'Credit Receivable Vault',
    apy: '1',
    lockPeriod: '30 days minimum',
    minLockDays: 30,
    description: 'Lock your credit receivable tokens to earn steady yields',
    tokenType: 'Credit Receivables',
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
  },
  commercial: {
    name: 'Commercial Receivable Vault',
    apy: '2',
    lockPeriod: '60 days minimum',
    minLockDays: 60,
    description: 'Higher yields for commercial receivable token holders',
    tokenType: 'Commercial Receivables',
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
  },
  trade: {
    name: 'Trade Receivable Vault',
    apy: '3',
    lockPeriod: '90 days minimum',
    minLockDays: 90,
    description: 'Maximum returns for trade finance token investors',
    tokenType: 'Trade Finance Receivables',
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
  }
};
export const VaultLock: React.FC = () => {
  const navigate = useNavigate();
  const {
    vaultType
  } = useParams<{
    vaultType: string;
  }>();
  const [lockPercentage, setLockPercentage] = useState(25);
  const [lockDuration, setLockDuration] = useState(3);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const vault = vaultDatabase[vaultType || 'credit'];
  // Mock user balance - in production, this would come from blockchain
  const userBalance = 10000;
  const tokensToLock = userBalance * lockPercentage / 100;
  const apyDecimal = parseFloat(vault.apy) / 100;
  // Mock token price (rETH is pegged to $1)
  const tokenPrice = 1.0;
  // Calculate monthly rewards based on APY
  const calculateMonthlyRewards = () => {
    const rewards = [];
    let totalReward = 0;
    for (let month = 1; month <= lockDuration; month++) {
      const monthlyReward = tokensToLock * apyDecimal / 12;
      totalReward += monthlyReward;
      rewards.push({
        month,
        reward: monthlyReward,
        cumulative: totalReward
      });
    }
    return rewards;
  };
  const monthlyRewards = calculateMonthlyRewards();
  const totalReward = monthlyRewards[monthlyRewards.length - 1]?.cumulative || 0;
  const handleLock = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      navigate('/dashboard');
    }, 3000);
  };
  if (!vault) {
    return <div>Vault not found</div>;
  }
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
      <div className="container mx-auto max-w-6xl px-6 py-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center text-white hover:text-gray-200 transition-colors mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>
        {/* Success Message */}
        {showConfirmation && <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 mb-6 flex items-start">
            <CheckCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-medium">Lock Successful!</p>
              <p className="text-green-300 text-sm">
                Your {tokensToLock.toFixed(2)} tokens have been locked in the
                vault for {lockDuration} months.
              </p>
            </div>
          </div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lock Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vault Header */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-900/30 p-4 rounded-xl">
                    <Lock size={32} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-black">
                        {vault.name}
                      </h1>
                      <div className={`inline-flex items-center ${vault.riskBg} ${vault.riskBorder} border px-3 py-1 rounded-full`}>
                        <ShieldCheck size={14} className={`${vault.riskColor} mr-1`} />
                        <span className={`text-xs font-semibold ${vault.riskColor}`}>
                          {vault.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{vault.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-[#b388ff]">
                    {vault.apy}%
                  </div>
                  <div className="text-gray-700 text-sm">APY</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-700 mt-4 pt-4 border-t border-purple-200">
                <Clock size={16} className="mr-2" />
                <span>{vault.lockPeriod}</span>
              </div>
            </div>
            {/* Underlying Receivables */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-black mb-4">
                Underlying Receivables Composition
              </h2>
              <p className="text-gray-700 text-sm mb-4">
                This vault's yields are backed by a diversified portfolio of
                high-quality receivables. Each receivable type is carefully
                selected and rated by independent credit agencies.
              </p>
              <div className="space-y-3">
                {vault.receivables.map((receivable, idx) => <div key={idx} className="bg-white rounded-lg p-4 border border-purple-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-black font-semibold">
                        {receivable.type}
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className="text-[#b388ff] font-bold text-lg">
                          {receivable.percentage}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                          {receivable.rating}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#b388ff] h-2 rounded-full" style={{
                    width: receivable.percentage
                  }}></div>
                    </div>
                  </div>)}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4 flex items-start">
                <Info size={16} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-blue-800 text-xs">
                  Credit ratings are provided by major rating agencies (S&P,
                  Moody's, Fitch). Higher ratings indicate lower default risk.
                </p>
              </div>
            </div>
            {/* Current Balance */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-black mb-4">
                Your Balance
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-700 text-sm mb-1">
                    Available Tokens
                  </div>
                  <div className="text-black text-2xl font-bold">
                    {userBalance.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">{vault.tokenType}</div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm mb-1">
                    Currently Locked
                  </div>
                  <div className="text-black text-2xl font-bold">0</div>
                  <div className="text-gray-600 text-sm">No active locks</div>
                </div>
              </div>
            </div>
            {/* Lock Amount Configuration */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-black mb-4">Lock Amount</h2>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-700 text-sm">
                    Percentage to Lock
                  </label>
                  <span className="text-[#b388ff] font-bold text-lg">
                    {lockPercentage}%
                  </span>
                </div>
                <input type="range" min="1" max="100" value={lockPercentage} onChange={e => setLockPercentage(parseInt(e.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#b388ff]" />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tokens to Lock</span>
                  <span className="text-black font-bold text-xl">
                    {tokensToLock.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Quick Percentage Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[25, 50, 75, 100].map(preset => <button key={preset} onClick={() => setLockPercentage(preset)} className={`py-2 rounded-lg transition-colors border ${lockPercentage === preset ? 'bg-[#b388ff] text-white border-[#b388ff]' : 'bg-white text-gray-700 border-purple-200 hover:bg-gray-50'}`}>
                    {preset}%
                  </button>)}
              </div>
            </div>
            {/* Lock Duration */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <h2 className="text-xl font-bold text-black mb-4">
                Lock Duration
              </h2>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-700 text-sm">Months</label>
                  <span className="text-[#b388ff] font-bold text-lg">
                    {lockDuration} months
                  </span>
                </div>
                <input type="range" min="1" max="12" value={lockDuration} onChange={e => setLockDuration(parseInt(e.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#b388ff]" />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1 month</span>
                  <span>6 months</span>
                  <span>12 months</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Lock Until</span>
                  <span className="text-black font-bold">
                    {new Date(Date.now() + lockDuration * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {lockDuration * 30 < vault.minLockDays && <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mt-4 flex items-start">
                  <AlertCircle size={16} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-800 text-xs">
                    Minimum lock period is {vault.minLockDays} days (
                    {Math.ceil(vault.minLockDays / 30)} months)
                  </p>
                </div>}
            </div>
            {/* Reward Projection */}
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <TrendingUp size={24} className="text-[#b388ff] mr-3" />
                <h2 className="text-xl font-bold text-black">
                  Reward Projection
                </h2>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {monthlyRewards.map(reward => <div key={reward.month} className="bg-white rounded-lg p-4 border border-purple-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-700 text-sm">
                          Month {reward.month}
                        </div>
                        <div className="text-black font-semibold">
                          +{reward.reward.toFixed(2)} tokens
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-700 text-sm">Cumulative</div>
                        <div className="text-[#b388ff] font-bold text-lg">
                          {reward.cumulative.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f0ebff] rounded-xl p-6 border border-purple-200 sticky top-6">
              <h2 className="text-xl font-bold text-black mb-6">
                Lock Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="text-gray-700 text-sm mb-1">
                    Tokens to Lock
                  </div>
                  <div className="text-black text-2xl font-bold">
                    {tokensToLock.toFixed(2)}
                  </div>
                  <div className="text-gray-600 text-xs">
                    ${(tokensToLock * tokenPrice).toFixed(2)} USD •{' '}
                    {lockPercentage}% of balance
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="text-gray-700 text-sm mb-1">
                    Lock Duration
                  </div>
                  <div className="text-black text-2xl font-bold">
                    {lockDuration}
                  </div>
                  <div className="text-gray-600 text-xs">months</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="text-gray-700 text-sm mb-1">
                    Expected Rewards
                  </div>
                  <div className="text-[#b388ff] text-2xl font-bold">
                    ${(totalReward * tokenPrice).toFixed(2)}
                  </div>
                  <div className="text-gray-600 text-xs">
                    +{totalReward.toFixed(2)} tokens earned
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="text-gray-700 text-sm mb-1">Final Value</div>
                  <div className="text-black text-2xl font-bold">
                    ${((tokensToLock + totalReward) * tokenPrice).toFixed(2)}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {(tokensToLock + totalReward).toFixed(2)} tokens • +
                    {(totalReward / tokensToLock * 100).toFixed(2)}% gain
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-start">
                <Info size={16} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-blue-800 text-xs">
                  Following ERC-4626 standard. Your tokens will be locked and
                  you'll receive vault shares representing your position.
                </p>
              </div>
              <button onClick={handleLock} disabled={lockDuration * 30 < vault.minLockDays || showConfirmation} className="w-full bg-[#b388ff] hover:bg-[#a070e9] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                <Lock size={20} className="mr-2" />
                Deposit Tokens
              </button>
              <p className="text-gray-600 text-xs text-center mt-4">
                Tokens will be locked for the selected duration and cannot be
                withdrawn early
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};