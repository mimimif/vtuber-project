export default function BoneHierarchy() {
    return (
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Bone Hierarchy</h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                <ul className="space-y-2">
                    <li className="text-sm font-medium text-gray-300">
                        <div className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer">
                            <span className="text-gray-500">▼</span>
                            <span>Root</span>
                        </div>
                        <ul className="pl-4 mt-1 space-y-1">
                            <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer text-gray-400">
                                <span className="text-gray-500">▶</span>
                                <span>Spine</span>
                            </li>
                            <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer text-gray-400">
                                <span className="text-gray-500">▶</span>
                                <span>Leg_L</span>
                            </li>
                            <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer text-gray-400">
                                <span className="text-gray-500">▶</span>
                                <span>Leg_R</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
