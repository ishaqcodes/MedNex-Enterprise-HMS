import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Clipboard, Activity, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const menuItems = {
    Admin: [{ label: 'Staff Management', icon: <Users />, path: '/admin' }],
    Doctor: [{ label: 'Appointments', icon: <Clipboard />, path: '/doctor' }],
    Patient: [{ label: 'My Records', icon: <Activity />, path: '/patient' }]
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col sticky top-0">
      <div className="p-6 text-2xl font-bold text-blue-400">MedNex</div>
      <nav className="flex-1 p-4">
        {menuItems[user?.role]?.map((item) => (
          <Link key={item.label} to={item.path} className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg">
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="p-4 border-t border-slate-800 flex items-center gap-3 text-gray-400 hover:text-white">
        <LogOut size={20}/> Logout
      </button>
    </aside>
  );
};
export default Sidebar;