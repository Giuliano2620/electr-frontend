export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm text-gray-500">
        <div>
          <p className="text-black font-bold text-lg mb-2">ElecTr</p>
          <p>Tecnología Apple, seleccionada para vos.</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-black font-semibold mb-1">Tienda</p>
          <p>Productos</p>
          <p>Carrito</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-black font-semibold mb-1">Cuenta</p>
          <p>Iniciar sesión</p>
          <p>Registrarse</p>
        </div>
      </div>
      <div className="border-t border-gray-100 text-center text-xs text-gray-400 py-4">
        © 2026 ElecTr. Todos los derechos reservados.
      </div>
    </footer>
  );
}