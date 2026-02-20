export default function Settings() {
    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Application Settings</h2>
            <div className="max-w-2xl bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-white">Project Default Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage default configurations for new VTuber models.</p>
                </div>
                <div className="border-t border-gray-700 pt-6">
                    <p className="text-sm text-gray-400">Settings form will go here...</p>
                </div>
            </div>
        </div>
    );
}
