export default function ToolPanel() {
    return (
        <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">2D Mesh Tools</h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-6">

                {/* Draw / Add */}
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Create</h4>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-gray-700 hover:bg-gray-600 text-sm py-2 px-2 rounded">ArtMesh</button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-sm py-2 px-2 rounded">Deformer</button>
                    </div>
                </div>

                {/* Edit */}
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Edit</h4>
                    <div className="flex flex-col space-y-2">
                        <button className="bg-gray-700 hover:bg-gray-600 text-sm py-2 px-3 rounded text-left flex justify-between">
                            <span>Edit Vertices</span>
                            <span className="text-gray-400">V</span>
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-sm py-2 px-3 rounded text-left flex justify-between">
                            <span>Bind Bones/Deformer</span>
                            <span className="text-gray-400">B</span>
                        </button>
                    </div>
                </div>

                {/* Texture */}
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Texture</h4>
                    <div className="flex flex-col space-y-2">
                        <div className="w-full h-24 bg-gray-900 border border-gray-600 rounded flex items-center justify-center text-gray-500 text-sm cursor-pointer hover:bg-gray-800">
                            Drop PSD / PNG
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-sm py-2 px-3 rounded text-white">
                            Assign Texture
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
