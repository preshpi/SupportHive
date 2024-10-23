import { useEffect, useRef } from 'react';

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const blurRef = useRef<HTMLDivElement>(null);

    // Add animation on mount
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.classList.remove('scale-75');
                }
                if (blurRef.current) {
                    blurRef.current.classList.add('backdrop-blur');
                }
            }, 50);
        }
    }, [isOpen]);

    // Close modal function
    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.classList.add('scale-75');
        }
        if (blurRef.current) {
            blurRef.current.classList.remove('backdrop-blur');
        }
        setTimeout(() => {
            onClose();
        }, 50);
    };

    if (!isOpen) return null; 

    return (
        <section className="fixed top-0 z-50 left-0">
            <div
                onClick={handleCloseModal}
                ref={blurRef}
                className="h-full w-full fixed bg-black/40"
            ></div>
            <div className="min-h-screen w-screen flex justify-center items-center ">
                <div
                    className="bg-white rounded-[16px] blur-none p-6 w-full mx-3 lg:mx-0 transition z-10 scale-75 duration-50 ease-out lg:w-[500px]"
                    ref={modalRef}
                >
                    <div className="my-4">
                        <h2 className="text-lg font-semibold text-black mb-4">
                            Confirm Submission
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to submit the campaign with the provided data?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-sm bg-gray-200 text-black rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm bg-green-500 text-white rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfirmationModal;
