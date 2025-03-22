import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Seminar, SeminarModalProps } from './api/Type';

const SeminarModal: React.FC<SeminarModalProps> = ({ seminar, setIsModalOpen }) => {
  const [editedSeminar, setEditedSeminar] = useState<Seminar>({ ...seminar });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedSeminar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:5001/api/seminars/${seminar.id}`, editedSeminar)
      .then(() => {
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating seminar:', error);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Редактирование семинара</h2>
        <input
          type="text"
          name="title"
          value={editedSeminar.title}
          onChange={handleChange}
          placeholder="Название"
          className="w-full p-2 mb-2 border rounded  text-black"
        />
        <textarea
          name="description"
          value={editedSeminar.description}
          onChange={handleChange}
          placeholder="Описание"
          className="w-full p-2 mb-2 border rounded text-black"
        />
        <input
          type="text"
          name="date"
          value={editedSeminar.date}
          onChange={handleChange}
          placeholder="Дата"
          className="w-full p-2 mb-2 border rounded  text-black"
        />
        <input
          type="text"
          name="time"
          value={editedSeminar.time}
          onChange={handleChange}
          placeholder="Время"
          className="w-full p-2 mb-2 border rounded  text-black"
        />
        <input
          type="text"
          name="photo"
          value={editedSeminar.photo}
          onChange={handleChange}
          placeholder="Фото URL"
          className="w-full p-2 mb-2 border rounded  text-black"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Сохранить
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeminarModal;