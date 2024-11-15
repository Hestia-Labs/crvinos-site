import React from 'react';

interface NavBarProps {
  selectedNav: string;
  setSelectedNav: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({
  selectedNav,
  setSelectedNav,
  setIsLoading,
  setShowLogoutModal,
}) => {
  return (
    <div className='flex flex-row items-start justify-start px-6 py-2'>
      <ul className='text-lg font-semibold space-x-5 flex flex-row uppercase'>
        <li
          className={`cursor-pointer hover:underline ${
            selectedNav === 'Historial de Compras' ? 'text-crred' : 'text-gray-500'
          }`}
          onClick={() => {
            setSelectedNav('Historial de Compras');
            setIsLoading(true);
          }}
        >
          Historial de Compras
        </li>
        <li
          className={`cursor-pointer hover:underline ${
            selectedNav === 'Ajustes' ? 'text-crred' : 'text-gray-500'
          }`}
          onClick={() => setSelectedNav('Ajustes')}
        >
          Ajustes
        </li>
        <li
          className='cursor-pointer hover:underline text-gray-500'
          onClick={() => setShowLogoutModal(true)}
        >
          Cerrar Sesión
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
