import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import './Layout.css';

function Layout(props) {
  const [isSelected, setSelected] = useState(window.location.pathname);
  const [valid, setValid] = useState('hidden validation')

  const toggleClass = () => {
    const pathname = window.location.pathname;
    setSelected(pathname);
    setValid('hidden validation');
  }

  const toggleVal = (e) => {
    setValid('validation')
  }

  useEffect(() => {
    if (props.item !== undefined) {
      setValid('hidden validation');
    }
  }, [props.item])


  return (
    <div className="layout">
      <div className="navbar">
        <div className={isSelected === '/discover' ? 'selected tabs': 'tabs'} onClick={toggleClass}>
          <Link to="/discover">Discover</Link>
        </div>
        <div className={isSelected === '/'? 'selected tabs': 'tabs'} onClick={toggleClass}>
          <Link to="/">Bag</Link>
        </div>
        <div className={isSelected === '/forge' ? 'selected tabs': 'tabs'} onClick={!props.item ? toggleVal : toggleClass}>
          {!props.item ? 
            'Forge'
            :
            <Link className='forge' to="/forge">Forge</Link>
          }
          <div className={valid}> 
            Select an Item
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout;