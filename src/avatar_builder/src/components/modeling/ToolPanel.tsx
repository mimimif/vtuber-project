export default function ToolPanel() {
    return (
        <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Modeling Tools</h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {/* Placeholder tools */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Basic Shapes</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 border border-gray-600 rounded text-sm text-gray-200 transition-colors">
                            Cube
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 border border-gray-600 rounded text-sm text-gray-200 transition-colors">
                            Sphere
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 border border-gray-600 rounded text-sm text-gray-200 transition-colors">
                            Cylinder
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 border border-gray-600 rounded text-sm text-gray-200 transition-colors">
                            Plane
                        </button>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-700 space-y-2">
                    <label className="text-sm font-medium text-gray-300">Transform</label>
                    <div className="flex flex-col space-y-2">
                        <button className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded text-sm text-white font-medium transition-colors text-left pl-3">
                            Translate
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 border border-gray-600 rounded text-sm text-gray-200 transition-colors text-left pl-3">
                            Rotate
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 border border-gray-600 rounded text-sm text-gray-200 transition-colors text-left pl-3">
                            Scale
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
