export default function BlendshapePanel() {
    return (
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Blendshapes</h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-300">Smile</label>
                    <input type="range" className="w-full mt-2 accent-blue-500" min="0" max="100" defaultValue="0" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-300">Frown</label>
                    <input type="range" className="w-full mt-2 accent-blue-500" min="0" max="100" defaultValue="0" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-300">EyeBlink_L</label>
                    <input type="range" className="w-full mt-2 accent-blue-500" min="0" max="100" defaultValue="0" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-300">EyeBlink_R</label>
                    <input type="range" className="w-full mt-2 accent-blue-500" min="0" max="100" defaultValue="0" />
                </div>
                <div className="pt-4 border-t border-gray-700">
                    <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded text-sm text-white font-medium transition-colors">
                        Add New Blendshape
                    </button>
                </div>
            </div>
        </div>
    );
}
