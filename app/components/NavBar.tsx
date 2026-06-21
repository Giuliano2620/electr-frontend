'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-sky-600">
        ElecTr
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/productos">Productos</Link>
        <Link href="/carrito">Carrito</Link>
        {token ? (
          <button onClick={logout} className="text-red-500">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link href="/login">Iniciar sesión</Link>
            <Link href="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}