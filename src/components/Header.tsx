import Settings from './Settings';

function Header() {
  return (
    <header className="grid grid-cols-5 p-2">
      <div className="flex justify-center align-middle items-center">
        <Settings />
      </div>
      <div className="col-span-3 flex justify-center items-center font-charriot text-header">
        ALL BASTARDS
      </div>
      <div></div>
    </header>
  );
}

export default Header;
