import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-sky-600">
        ElecTr
      </Link>
      <div className="flex gap-4">
        <Link href="/productos">Productos</Link>
        <Link href="/carrito">Carrito</Link>
      </div>
    </nav>
  );
}
