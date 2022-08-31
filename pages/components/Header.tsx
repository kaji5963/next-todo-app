const Header = () => {
  return (
    <header className="bg-blue-100 h-20 flex justify-around items-center">
      <div className="text-center text-5xl font-extrabold leading-none tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-green-300">
          Welcome to Todo App
        </span>
      </div>
    </header>
  );
}

export default Header;