const CustomModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[70vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;