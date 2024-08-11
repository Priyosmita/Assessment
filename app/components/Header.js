export default function Header() {
  return (
    <>
      <header className="bg-black text-white py-4 h-16">
        <div className="container mx-auto text-center flex flex-col justify-center items-center">
          <img src="/assets/logo.png" alt="logo" className="h-10 w-56" />
        </div>
      </header>
      <hr class="h-px  bg-gray-200 border-0 dark:bg-[#1e1e20]" />
    </>
  );
}