'use client';
import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import OrderHistory from './OrderHistory';
import SettingsForm from './SettingsForm';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import OrderDetailsModal from './OrderDetailsModal';


//TODO: Make resposinve for different screen sizes

const ProfileComponent: React.FC = () => {
  const userName = 'Marco'; // Should be dynamically fetched
  const userEmail = 'marco@example.com'; // Should be dynamically fetched

  const [selectedNav, setSelectedNav] = useState<string>('Historial de Compras');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State for settings
  const [name, setName] = useState<string>(userName);
  const [email, setEmail] = useState<string>(userEmail);
  const [phone, setPhone] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  // State for modals
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (selectedNav === 'Historial de Compras') {
      // Simulate fetching data
      setTimeout(() => {
        // Mock data
        const mockOrders = [
          {
            id: 1,
            date: '2023-09-15',
            status: 'Entregado',
            total: '$150.00',
            subtotal: '$135.00',
            tax: '$15.00',
            trackingNumber: 'ABC123456789',
            items: [
              { name: 'Vino Tinto Reserva', quantity: 2, price: '$50.00' },
              { name: 'Vino Blanco Chardonnay', quantity: 1, price: '$35.00' },
            ],
          },
          {
            id: 2,
            date: '2023-10-01',
            status: 'En camino',
            total: '$85.00',
            subtotal: '$80.00',
            tax: '$5.00',
            trackingNumber: 'XYZ987654321',
            items: [
              { name: 'Vino Rosado', quantity: 1, price: '$25.00' },
              { name: 'Vino Espumoso', quantity: 3, price: '$55.00' },
            ],
          },
          {
            id: 3,
            date: '2023-10-20',
            status: 'Procesando',
            total: '$200.00',
            subtotal: '$180.00',
            tax: '$20.00',
            trackingNumber: null,
            items: [{ name: 'Vino de Autor', quantity: 4, price: '$45.00' }],
          },
          {
            id: 4,
            date: '2023-10-25',
            status: 'Cancelado',
            total: '$0.00',
            subtotal: '$0.00',
            tax: '$0.00',
            trackingNumber: null,
            items: [{ name: 'Vino Orgánico', quantity: 1, price: '$30.00' }],
          },
        ];
        setOrders(mockOrders);
        setIsLoading(false);
      }, 1500);
    }
  }, [selectedNav]);

  const handleSaveSettings = () => {
    alert('Configuración guardada exitosamente.');
  };

  const handleLogout = () => {
    alert('Has cerrado sesión.');
    setShowLogoutModal(false);
  };

  return (
    <div className='px-4 sm:px-8 md:px-10 lg:px-20 w-full flex flex-col justify-center items-center'>
      <div className='w-full flex flex-col md:flex-row items-end justify-between mt-8'>
        <div className='flex flex-col items-start justify-start py-4'>
          <h1 className='text-5xl font-semibold mb-2 text-crred'>Hola, {userName}!</h1>
          <p className='text-lg text-gray-700'>
            Bienvenido a tu perfil. Aquí puedes ver y editar tu información personal.
          </p>
        </div>
        <NavBar
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
          setIsLoading={setIsLoading}
          setShowLogoutModal={setShowLogoutModal}
        />
      </div>
      <div className='w-full  flex flex-col justify-center items-center py-8 border-crred border-t-2'>
        <div className='flex flex-col items-center justify-center space-y-7 p-4 sm:p-6 w-full '>
          {selectedNav === 'Historial de Compras' && (
            <OrderHistory
              orders={orders}
              isLoading={isLoading}
              setSelectedOrder={setSelectedOrder}
            />
          )}
          {selectedNav === 'Ajustes' && (
            <SettingsForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              birthday={birthday}
              setBirthday={setBirthday}
              handleSaveSettings={handleSaveSettings}
            />
          )}
          {/* Removed the 'Log Out' section */}
        </div>
      </div>

      {/* Modals */}
      {showLogoutModal && (
        <LogoutConfirmationModal
          handleLogout={handleLogout}
          closeModal={() => setShowLogoutModal(false)}
        />
      )}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          closeModal={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default ProfileComponent;