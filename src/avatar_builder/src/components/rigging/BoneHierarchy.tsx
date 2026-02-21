export default function BoneHierarchy() {
    return (
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700 font-medium text-white flex justify-between items-center">
                <span>Deformer Hierarchy</span>
                <button className="text-gray-400 hover:text-white">+</button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                        <div className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer">
                            <span className="text-gray-500 text-xs">▼</span>
                            <span>Root</span>
                        </div>
                        <ul className="pl-4 mt-1 space-y-1">
                            <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer">
                                <span className="text-gray-500 text-xs">▼</span>
                                <span>Face Deformer (XY)</span>
                            </li>
                            <ul className="pl-4 mt-1 space-y-1">
                                <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer text-gray-400">
                                    <span className="text-gray-500 text-xs">▶</span>
                                    <span>Eye L Deformer</span>
                                </li>
                                <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer text-gray-400">
                                    <span className="text-gray-500 text-xs">▶</span>
                                    <span>Eye R Deformer</span>
                                </li>
                                <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer text-gray-400">
                                    <span className="text-gray-500 text-xs">▶</span>
                                    <span>Mouth Deformer</span>
                                </li>
                            </ul>
                            <li className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded cursor-pointer text-gray-400">
                                <span className="text-gray-500 text-xs">▶</span>
                                <span>Body Z Deformer</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
