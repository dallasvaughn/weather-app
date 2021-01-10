import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Search', href: '/weather/search' },
    currentUser && { label: 'My Weather', href: '/weather/saved' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <div className="header">
      <nav className="navbar">
        <Link href="/">
          <a className="navbar-brand">Weather Explorer</a>
        </Link>

        <div className="d-flex justify-content-end">
          <ul className="nav d-flex alight-items-center">{links}</ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
