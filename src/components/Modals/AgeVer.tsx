'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Icon from '../Icons'

export default function AgeVer() {
  const [open, setOpen] = useState(true);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [country, setCountry] = useState('');
  const [drinkingAge, setDrinkingAge] = useState(18);

  useEffect(() => {
    const ageConfirmed = sessionStorage.getItem('ageConfirmed');
    if (ageConfirmed) {
      setOpen(false);
    } else {
      fetch('https://ipapi.co/json/')
      .then((response: Response) => response.json() as Promise<{ country_name: string }>)
      .then((data: { country_name: string }) => {
        setCountry(data.country_name);
        if (data.country_name === 'United States') {
          setDrinkingAge(21);
        }
      })
      .catch(() => setCountry(''));
    }
  }, []);

  const handleConfirm = () => {
    if (!day || !month || !year) {
      setError('Debes verificar tu edad.');
      return;
    }
  
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age >= drinkingAge) {
      sessionStorage.setItem('ageConfirmed', 'true');
      setOpen(false);
      setError('');
    } else {
      setError('No tienes la edad legal para entrar al sitio.');
    }
  };
  

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-back px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex items-center justify-center ">
                <Icon name={`CRVinos-red`} className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-crred font-semibold leading-6 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  ¡Bienvenidos a CR Vinos!
                </DialogTitle>
                <div className="mt-2">
                  <p className=" text-xxs sm:text-xxs md:text-xs lg:text-sm text-gray-500">
                    Por favor, confirma que tienes la edad legal para consumir alcohol en tu país.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <div className="flex space-x-2">
                <select
                  className="w-1/3 rounded-md border border-crred px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-crred"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">Día</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select
                  className="w-1/3 rounded-md border border-crred px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-crred"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Mes</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  className="w-1/3 rounded-md border border-crred px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-crred"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Año</option>
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {error && <p className="mt-2 text-xs sm:text-sm text-red-500">{error}</p>}
              <button
                type="button"
                onClick={handleConfirm}
                className="mt-4 inline-flex w-full justify-center rounded-md bg-crred px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm font-semibold text-back shadow-sm transition-all duration-300 ease-in-out hover:bg-crred-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crred"
              >
                Confirmar
              </button>
              <p className="mt-4 text-xs sm:text-sm text-gray-500 text-center">
                Este sitio está dirigido a mayores de edad en países en el que el consumo de bebidas alcohólicas es permitido por las leyes correspondientes.
                Al entrar al sitio, acepta los términos y condiciones de uso así como la política de privacidad.
              </p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
