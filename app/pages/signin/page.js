'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here (e.g., Firebase, API call, etc.)
    console.log('Logged in:', { email, password });
    router.push('/main');
  };

  const handleSignup = () => {
    // Implement your signup logic here (e.g., Firebase, API call, etc.)
    console.log('Signed up:', { email, password });
    router.push('/main');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-black">
        <div className="bg-[#121212] p-8 rounded-xl w-100 border-2 border-[#252527] h-auto shadow-lg text-center">
          <h2 className="text-white text-2xl mb-6">Create a new account</h2>
          <button
            onClick={handleSignup}
            className="bg-[#121212] border border-slate-400 text-slate-300 text-lg py-2 px-4 rounded-lg h-14  w-full mb-4 flex items-center justify-center"
          >
            <img
              src="/assets/google.png"
              alt="Google Icon"
              className="w-6 h-6 mr-2"
            />
            Sign Up with Google
          </button>
          <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-sm px-9 py-4 mt-8 text-center me-2 mb-8">Create an account</button>
          <p className="text-gray-400">
            Already have an account?{' '}
            <span
              className="text-gray-200 cursor-pointer"
              onClick={handleLogin}
            >
              Sign In
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}