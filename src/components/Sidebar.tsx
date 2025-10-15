import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import {
  Home,
  BarChart,
  DollarSign,
  BookOpen,
  Trophy,
  User as UserIcon,
  LogOut
} from 'lucide-react';

type SidebarPage = 'home' | 'dashboard' | 'financialTools' | 'learning' | 'achievements' | 'profile';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activePage: SidebarPage;
  user?: { name?: string; totalPoints?: number; photoURL?: string | null } | null;
  onLogout: () => void;
};

type NavItem = {
  id: SidebarProps['activePage'];
  label: string;
  to: string;
  Icon: ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', to: '/', Icon: Home },
  { id: 'dashboard', label: 'Dashboard', to: '/dashboard', Icon: BarChart },
  { id: 'financialTools', label: 'Tools', to: '/tools', Icon: DollarSign },
  { id: 'learning', label: 'Learning', to: '/learning', Icon: BookOpen },
  { id: 'achievements', label: 'Achievements', to: '/achievements', Icon: Trophy },
  { id: 'profile', label: 'Profile', to: '/profile', Icon: UserIcon },
];

const HEADER_VARIANTS: Record<SidebarProps['activePage'], { label: string; gradient: string; Icon: NavItem['Icon'] }> = {
  home: { label: 'MeridianAlgo', gradient: 'from-orange-500 to-amber-500', Icon: Home },
  dashboard: { label: 'Dashboard', gradient: 'from-orange-500 to-amber-500', Icon: BarChart },
  financialTools: { label: 'Financial Tools', gradient: 'from-emerald-500 to-lime-400', Icon: DollarSign },
  learning: { label: 'Learning', gradient: 'from-indigo-500 to-purple-500', Icon: BookOpen },
  achievements: { label: 'Achievements', gradient: 'from-yellow-500 to-orange-500', Icon: Trophy },
  profile: { label: 'Profile', gradient: 'from-fuchsia-500 to-violet-500', Icon: UserIcon },
};

const Sidebar = ({ sidebarOpen, setSidebarOpen, activePage, user: _user, onLogout }: SidebarProps) => {
  const headerConfig = HEADER_VARIANTS[activePage] ?? HEADER_VARIANTS.home;
  const hoverTimer = useRef<number | null>(null);

  const headerLinkClasses = sidebarOpen
    ? 'flex items-center justify-center w-12 h-12 pl-3 pr-2'
    : 'flex items-center justify-center w-12 h-12 pl-3 pr-2';

  const headerIconSize = 'w-12 h-12';

  const headerContainerClasses = sidebarOpen
    ? 'p-5 border-b border-gray-800/70'
    : 'px-3 py-5 border-b border-gray-800/70';

  const footerContainerClasses = sidebarOpen
    ? 'p-4 border-t border-gray-800/70'
    : 'px-3 py-4 border-t border-gray-800/70';

  const supportsHover = () => (typeof window !== 'undefined' ? window.matchMedia('(hover: hover)').matches : false);

  const clearTimer = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const openSidebar = () => {
    clearTimer();
    setSidebarOpen(true);
  };

  const scheduleClose = () => {
    if (!supportsHover()) return;
    clearTimer();
    hoverTimer.current = window.setTimeout(() => {
      setSidebarOpen(false);
      hoverTimer.current = null;
    }, 320);
  };

  useEffect(() => () => clearTimer(), []);

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-gray-950/95 border-r border-gray-800/70 backdrop-blur-xl shadow-2xl shadow-black/40
        transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${sidebarOpen ? 'w-72' : 'w-20'}`}
      onMouseEnter={() => supportsHover() && openSidebar()}
      onMouseLeave={() => scheduleClose()}
      onFocusCapture={openSidebar}
      onBlurCapture={scheduleClose}
    >
      {/* Header */}
      <div className={headerContainerClasses}>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={headerLinkClasses}
          >
            <div className={`${headerIconSize} rounded-xl bg-gradient-to-br ${headerConfig.gradient} text-white grid place-items-center shadow-lg shadow-black/20 flex-shrink-0`}>
              <headerConfig.Icon className="w-5 h-5" />
            </div>
          </Link>
          {sidebarOpen && (
            <span className="text-2xl font-semibold text-white whitespace-nowrap">{headerConfig.label}</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, to, Icon }) => {
          const isActive = activePage === id;
          const itemDimensions = sidebarOpen
            ? 'w-full h-12 gap-3 px-3'
            : 'justify-start w-12 h-12 pl-3 pr-2';
          return (
            <Link
              key={id}
              to={to}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex items-center rounded-xl transition-all duration-200 ${itemDimensions}
                ${isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-gray-800/70'}`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${isActive ? 'text-white scale-105' : 'text-orange-400 group-hover:text-orange-300 group-hover:scale-105'}`} />
              {sidebarOpen && <span className="text-sm font-medium tracking-wide">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Account */}
      <div className={footerContainerClasses}>
        {_user && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0">
              {(_user.photoURL) ? (
                <img
                  src={_user.photoURL}
                  alt={_user.name || 'User avatar'}
                  className="w-10 h-10 rounded-xl object-cover border border-gray-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white grid place-items-center font-semibold">
                  {(_user.name?.charAt(0) || '?').toUpperCase()}
                </div>
              )}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{_user.name || 'Learner'}</p>
                <p className="text-xs text-gray-400">{_user.totalPoints ?? 0} pts</p>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={onLogout}
            className={`flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors ${sidebarOpen ? 'w-full justify-start' : 'w-auto justify-center'}`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
