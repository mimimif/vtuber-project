export default function BlendshapePanel() {
    return (
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700 font-medium text-white flex justify-between items-center">
                <span>Parameters</span>
                <button className="text-gray-400 hover:text-white">+</button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <label>ParamAngleX</label>
                        <span>0.0</span>
                    </div>
                    <input type="range" min="-30" max="30" defaultValue="0" className="w-full accent-blue-500" />
                </div>
                <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <label>ParamAngleY</label>
                        <span>0.0</span>
                    </div>
                    <input type="range" min="-30" max="30" defaultValue="0" className="w-full accent-blue-500" />
                </div>
                <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <label>ParamEyeLOpen</label>
                        <span>1.0</span>
                    </div>
                    <input type="range" min="0" max="1" step="0.1" defaultValue="1" className="w-full accent-blue-500" />
                </div>
                <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <label>ParamMouthOpenY</label>
                        <span>0.0</span>
                    </div>
                    <input type="range" min="0" max="1" step="0.1" defaultValue="0" className="w-full accent-blue-500" />
                </div>
            </div>
        </div>
    );
}
