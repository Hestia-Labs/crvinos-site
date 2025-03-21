'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react';
import Image from 'next/image';

interface AgeVerModalProps {
  country: string;
  drinkingAge: number;
}

// Pages you want to bypass age checking:
const bypassPages: { [key: string]: boolean } = {
  '/restaurant/menu': true,
};

/** Simple helper to get a cookie value by name */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

/** Simple helper to set a cookie with a max-age */
function setCookie(name: string, value: string, maxAgeDays = 365) {
  if (typeof document === 'undefined') return;
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/`;
}

export default function AgeVerModal({ country, drinkingAge }: AgeVerModalProps) {
  const [open, setOpen] = useState(true);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // We only want to check cookies in the browser.
    if (typeof window === 'undefined') return;

    const currentPath = pathname;
    // If the page is in the bypass list, hide the modal immediately:
    if (bypassPages[currentPath]) {
      setOpen(false);
      return;
    }

    // Check if age was already confirmed (via cookie)
    const ageConfirmed = getCookie('ageConfirmed');
    if (ageConfirmed === 'true') {
      setOpen(false);
    }
  }, [pathname]);

  const handleConfirm = () => {
    if (!day || !month || !year) {
      setError('Debes verificar tu edad.');
      return;
    }

    // Validate numeric input:
    const birthDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age >= drinkingAge) {
      // Set a cookie to remember the user confirmed their age
      setCookie('ageConfirmed', 'true', 365); // store for 1 year
      setOpen(false);
      setError('');
    } else {
      setError('No tienes la edad legal para entrar al sitio.');
    }
  };

  if (!open) return null;

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
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all
                       data-[closed]:translate-y-4 data-[closed]:opacity-0
                       data-[enter]:duration-300 data-[leave]:duration-200
                       data-[enter]:ease-out data-[leave]:ease-in sm:my-8
                       sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0
                       data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex items-center justify-center">
                <Image
                  src="/img/icons/CRVinos-red.svg"
                  alt="CR Vinos Logo"
                  width={80}
                  height={80}
                  className="h-16 w-16 sm:h-20 sm:w-20"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-crred font-semibold leading-6 sm:text-sm md:text-base"
                >
                  ¡Bienvenidos a CR Vinos!
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Por favor, confirma que tienes la edad legal para consumir alcohol en tu país.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <div className="flex space-x-2">
                <select
                  className="w-1/3 rounded-md border border-crred px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-crred"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">Día</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/3 rounded-md border border-crred px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-crred"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Mes</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/3 rounded-md border border-crred px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-crred"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Año</option>
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(
                    (yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    )
                  )}
                </select>
              </div>

              {error && (
                <p className="mt-2 text-xs text-red-500">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleConfirm}
                className="mt-4 inline-flex w-full justify-center rounded-md bg-crred px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-crred-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crred"
              >
                Confirmar
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Este sitio está dirigido a mayores de edad en países con consumo de bebidas alcohólicas permitido por ley.
                Al entrar, aceptas los términos y condiciones de uso así como la política de privacidad.
              </p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
