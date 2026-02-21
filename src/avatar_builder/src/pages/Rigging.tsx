import BoneHierarchy from '../components/rigging/BoneHierarchy';
import BlendshapePanel from '../components/rigging/BlendshapePanel';
import ModelingCanvas from '../components/modeling/ModelingCanvas';

export default function Rigging() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                <h2 className="text-2xl font-bold">2D Deformer & Parameter Rigging</h2>
                <div className="space-x-2">
                    <button className="bg-green-700 hover:bg-green-600 px-3 py-1.5 text-sm rounded transition-colors">Test Animation</button>
                    <button className="bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-sm font-medium rounded transition-colors">Export Rig</button>
                </div>
            </div>
            <div className="flex-1 flex overflow-hidden rounded-lg bg-gray-900 border border-gray-700">
                <BoneHierarchy />
                <div className="flex-1 relative border-r border-gray-700">
                    {/* Reuse ModelingCanvas for previewing rig */}
                    <ModelingCanvas />
                </div>
                <BlendshapePanel />
            </div>
        </div>
    );
}
