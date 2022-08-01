import React, { useState } from 'react';
import './style/dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown(props) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {props.menuItens.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={{pathname: item.path,
                search: item.search}}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;