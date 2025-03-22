'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeminarModal from './SeminarModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { Seminar } from './api/Type';

const SeminarList: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/seminars')
      .then(response => {
        setSeminars(response.data);
      })
      .catch(error => {
        console.error('Error fetching seminars:', error);
      });
  }, []);

  const handleEdit = (seminar: Seminar) => {
    setSelectedSeminar(seminar);
    setIsModalOpen(true);
  };

  const handleDelete = (seminarId: number) => {
    axios.delete(`http://localhost:5001/api/seminars/${seminarId}`)
      .then(() => {
        setSeminars(seminars.filter(seminar => seminar.id !== seminarId));
        setIsDeleteModalOpen(false);
      })
      .catch(error => {
        console.error('Error deleting seminar:', error);
      });
  };

  const openDeleteModal = (seminar: Seminar) => {
    setSelectedSeminar(seminar);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedSeminar(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Список семинаров</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seminars.map(seminar => (
          <li key={seminar.id} className="border p-4 rounded-lg shadow-md bg-white flex flex-col">
            <h2 className="text-xl font-semibold text-black mb-2">{seminar.title}</h2>
            <p className="text-gray-700 mb-2 flex-grow">{seminar.description}</p>
            <p className="text-gray-500 mb-2">{seminar.date} в {seminar.time}</p>
            <img src={seminar.photo} alt={seminar.title} className="w-32 h-auto rounded-lg mt-2 mb-4" />
            <div className="mt-auto">
              <button
                onClick={() => handleEdit(seminar)}
                className="mt-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Редактировать
              </button>
              <button
                onClick={() => openDeleteModal(seminar)}
                className="mt-2 mb-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedSeminar && (
        <SeminarModal
          seminar={selectedSeminar}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isDeleteModalOpen && selectedSeminar && (
        <DeleteConfirmModal
          seminarTitle={selectedSeminar.title}
          onConfirm={() => handleDelete(selectedSeminar.id)}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default SeminarList;