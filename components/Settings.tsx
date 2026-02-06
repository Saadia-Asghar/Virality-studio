
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [integrations, setIntegrations] = useState([
    { name: 'Instagram', connected: true, username: '@performance_pro' },
    { name: 'TikTok', connected: true, username: '@jdoe_fitness' },
    { name: 'LinkedIn', connected: false, username: null },
    { name: 'Twitter', connected: false, username: null },
  ]);

  const toggleConnection = (index: number) => {
    const newIntegrations = [...integrations];
    newIntegrations[index].connected = !newIntegrations[index].connected;
    setIntegrations(newIntegrations);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">User Profile</h2>
          <button className="text-sm font-bold text-indigo-600">Edit Profile</button>
        </div>
        <div className="p-8 flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-indigo-50">JD</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
            <p className="text-gray-500 text-sm">Fitness & Lifestyle Entrepreneur</p>
            <p className="text-xs text-gray-400 mt-1">Member since January 2024</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Platform Integrations</h2>
          <p className="text-xs text-gray-500 mt-1">Connect your accounts to sync analytics and auto-publish content.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {integrations.map((item, i) => (
            <div key={i} className="px-8 py-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                   {item.name === 'Instagram' && '📸'}
                   {item.name === 'TikTok' && '🎵'}
                   {item.name === 'LinkedIn' && '💼'}
                   {item.name === 'Twitter' && '🐦'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.connected ? `Connected as ${item.username}` : 'Not connected'}</p>
                </div>
              </div>
              <button 
                onClick={() => toggleConnection(i)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  item.connected ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {item.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Billing & Plan</h2>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded mb-2">PRO PLAN</span>
              <p className="text-xl font-bold text-gray-900">$49 / month</p>
              <p className="text-sm text-gray-500 mt-1">Next billing date: Feb 24, 2025</p>
            </div>
            <button className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">Manage Billing</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
