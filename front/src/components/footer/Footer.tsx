export function Footer() {
  return (
    <footer className="bg-[#0760F0] py-10 md:py-20 text-white mt-auto w-full">
      <div className="container mx-auto text-center flex flex-col gap-8 px-4 md:px-0">
        <h1 className="text-lg md:text-2xl font-bold">
          Let’s work together on your next project
        </h1>
        <p className="text-sm md:text-xl md:max-w-lg mx-auto">
          Find trusted experts in your area and get your project started!
        </p>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} Xavier Montero
          </p>
        </div>
      </div>
    </footer>
  );
}
