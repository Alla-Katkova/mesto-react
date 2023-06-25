import logo from '../../images/logo_mesto.svg'
export default function Header() {
  return (
    <header className="header">
    <img
      src={logo}
      className="header__logo"
      alt="лого место"
    />
  </header>
  )
}