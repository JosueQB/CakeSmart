"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from 'next/image';
export default function Navbar() {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="p-0">
          <Image
            src="/logo_tortaSmart.png" // Ruta de la imagen en la carpeta public
            alt="Logo de JortaSmart"
            width={40} // Ancho de la imagen
            height={50} // Alto de la imagen
          />
        </div>
        <h1 className="text-white text-2xl font-bold">CakeSmart</h1>
        <div className="space-x-4">
          {isClient && session?.user ? (
            <div className="flex gap-x-4 items-center">
              <Link href="/inicio" className="text-white  px-3 py-2 rounded hover:bg-indigo-700 ">Principal</Link>
              <Link href="/inventario" className="text-white  px-3 py-2 rounded hover:bg-indigo-700 ">Inventario</Link>
              <p className="text-white">{session.user.name} </p>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="User profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              )}
              <button
                onClick={async () => { await signOut({ callbackUrl: "/" }); }}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-sky-400 px-3 py-2 rounded text-white hover:bg-sky-500"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
