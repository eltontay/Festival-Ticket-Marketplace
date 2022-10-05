import Link from 'next/link';
import { useUser } from '../context/user';
export default function Navbar() {
  const { state, disconnect } = useUser();
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button
          className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div
          className="collapse navbar-collapse flex-grow items-center"
          id="navbarSupportedContent1"
        >
          <Link className="text-xl text-white pr-2 font-semibold" href="/">
            BlockFest
          </Link>
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
            <li className="nav-item p-2">
              <Link className="nav-link text-white" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link
                className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                href="/BuyTicket"
              >
                Buy Ticket
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link
                className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                href="/Marketplace"
              >
                Marketplace
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link
                className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                href="/Profile"
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className=" text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0">
            {state.isConnected ? (
              <div className="flex flex-wrap justify-end space-x-4 items-center">
                <button
                  className="flex uppercase p-2 inline-block text-sm bg-white rounded font-semibold hover:bg-indigo-100"
                  onClick={() => disconnect()}
                >
                  <p className="text-black">Disconnect Wallet</p>
                </button>
                <div className="flex inline-block">
                  <p>
                    {` ${state.address}`.slice(0, 5)}...
                    {`${state.address}`.slice(-5)}
                  </p>
                </div>
              </div>
            ) : (
              <p>Please connect your wallet</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
