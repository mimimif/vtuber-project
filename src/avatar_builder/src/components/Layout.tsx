import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    CubeIcon,
    PaintBrushIcon,
    LinkIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Modeling', href: '/modeling', icon: CubeIcon },
    { name: 'Texturing', href: '/texturing', icon: PaintBrushIcon },
    { name: 'Rigging', href: '/rigging', icon: LinkIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Layout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-gray-800 border-r border-gray-700">
                <div className="flex items-center justify-center h-16 border-b border-gray-700">
                    <span className="text-xl font-bold tracking-wider text-blue-400">Avatar Builder</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
