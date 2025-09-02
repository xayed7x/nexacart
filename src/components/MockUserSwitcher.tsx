'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

// This is a server action we will create in the next step
import { switchUser } from '@/app/_actions/auth'; 

interface User {
  id: number;
  name: string;
}

interface MockUserSwitcherProps {
  users: User[];
  currentUser: number | null;
}

export default function MockUserSwitcher({ users, currentUser }: MockUserSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    startTransition(() => {
      // Call the server action to set the cookie
      switchUser(userId);
      // Refresh the page to reflect the new user state
      router.refresh(); 
    });
  };

  return (
    <div className="bg-yellow-200 text-yellow-800 text-xs p-2 fixed bottom-4 left-4 rounded-lg shadow-lg z-50 font-montserrat">
      <h3 className="font-bold mb-2">Mock User Switcher (Dev Only)</h3>
      <select 
        name="user" 
        id="user"
        onChange={handleUserChange}
        defaultValue={currentUser || 'guest'}
        disabled={isPending}
        className="block w-full rounded-md border-gray-300 shadow-sm p-1 text-xs focus:ring-mocha-mousse focus:border-mocha-mousse"
      >
        <option value="guest">Guest</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.id === 2 ? 'Admin' : 'Customer'})
          </option>
        ))}
      </select>
      {isPending && <p className="mt-1 text-xs">Switching...</p>}
    </div>
  );
}