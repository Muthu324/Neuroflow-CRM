import { useState } from 'react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export const Settings = ({ darkMode, setDarkMode }) => {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#F1F5F9]">Settings</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/6">
        {['general', 'appearance', 'integrations', 'notifications'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? 'tab-active'
                : 'text-[#94A3B8] hover:text-[#F1F5F9] border-b-2 border-transparent'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <Card className="p-6 max-w-md space-y-4">
          <Input label="Full Name" defaultValue="Alex Rivera" />
          <Input label="Email" defaultValue="alex@example.com" />
          <Input label="Company" defaultValue="Your Company" />
          <Button variant="primary">Save Changes</Button>
        </Card>
      )}

      {/* Appearance */}
      {activeTab === 'appearance' && (
        <Card className="p-6 max-w-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-medium text-[#F1F5F9]">Dark Mode</div>
              <div className="text-xs text-[#94A3B8]">Toggle theme</div>
            </div>
            <div
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 99,
                background: darkMode ? 'linear-gradient(135deg,#6366F1,#8B5CF6)' : 'rgba(255,255,255,0.1)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 2,
                  left: darkMode ? 22 : 2,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s',
                }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <Card className="p-6 max-w-md space-y-3">
          {[
            { name: 'LinkedIn', icon: '🔗', connected: true },
            { name: 'Instagram', icon: '📱', connected: true },
            { name: 'Google Calendar', icon: '📅', connected: false },
            { name: 'Slack', icon: '#', connected: false },
          ].map(app => (
            <div key={app.name} className="flex items-center justify-between p-3 border border-white/6 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">{app.icon}</span>
                <span className="text-sm text-[#F1F5F9]">{app.name}</span>
              </div>
              <button className={`text-xs font-medium px-3 py-1 rounded-lg ${
                app.connected ? 'bg-red-500/10 text-red-500' : 'bg-[#6366F1]/10 text-[#6366F1]'
              }`}>
                {app.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </Card>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <Card className="p-6 max-w-md space-y-4">
          {['Email notifications', 'SMS alerts', 'Push notifications', 'Daily digest'].map(pref => (
            <div key={pref} className="flex items-center justify-between">
              <label className="text-sm text-[#F1F5F9]">{pref}</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          ))}
          <Button variant="primary">Save Preferences</Button>
        </Card>
      )}
    </div>
  )
}

export default Settings
