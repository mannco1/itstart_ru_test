import React from 'react';

interface DeleteConfirmModalProps {
  seminarTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ seminarTitle, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Подтверждение удаления</h2>
        <p className="mb-4 text-black">Вы уверены, что хотите удалить семинар "{seminarTitle}"?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Удалить
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;