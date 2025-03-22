export interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
  }
  
  export interface SeminarModalProps {
    seminar: Seminar;
    setIsModalOpen: (isOpen: boolean) => void;
  }