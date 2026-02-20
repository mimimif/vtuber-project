import ModelingCanvas from '../components/modeling/ModelingCanvas';
import ToolPanel from '../components/modeling/ToolPanel';

export default function Modeling() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                <h2 className="text-2xl font-bold">3D Modeling Editor</h2>
                <div className="space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 text-sm rounded transition-colors">Import</button>
                    <button className="bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-sm font-medium rounded transition-colors">Export</button>
                </div>
            </div>
            <div className="flex-1 flex overflow-hidden rounded-lg bg-gray-900 border border-gray-700">
                <div className="flex-1 relative">
                    <ModelingCanvas />
                </div>
                <ToolPanel />
            </div>
        </div>
    );
}
