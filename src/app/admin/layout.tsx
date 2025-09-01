import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-montserrat flex min-h-screen bg-off-white text-charcoal">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-off-white flex flex-col p-4">
        <h1 className="text-2xl font-bold font-merriweather mb-8">
          NexaCart Admin
        </h1>
        <nav>
          <ul>
            <li className="mb-2">
              <Link
                href="/admin"
                className="block py-2 px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="block py-2 px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse"
              >
                Orders
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/products"
                className="block py-2 px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse"
              >
                Products
              </Link>
            </li>
            {/* Future links will go here */}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
