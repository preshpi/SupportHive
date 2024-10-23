

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm }: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
                <p>Are you sure you want to submit this campaign?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
