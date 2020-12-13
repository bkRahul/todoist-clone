import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Dropdown.scss';

export const Dropdown = ({
  customClass,
  select,
  options = [],
  clickHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const drop = useRef(null);

  //close dropdown on outside click
  const handleOutsideClick = useCallback(
    (e) => {
      if (!e.target.closest(`.${drop.current.className}`) && isOpen) {
        setIsOpen(false);
        document.removeEventListener('click', handleOutsideClick, false);
      }
    },
    [isOpen]
  );

  //close dropdown on esc keypress
  const handleKeyUp = useCallback((e) => {
    const keys = {
      27: () => {
        e.preventDefault();
        setIsOpen(false);
        window.removeEventListener('keyup', handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);
    document.addEventListener('click', handleOutsideClick, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [handleOutsideClick, handleKeyUp]);

  return (
    <div className={`custom-dropdown ${customClass}`} ref={drop}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {select}
      </button>
      {isOpen && (
        <ul>
          {options.map((item) => (
            <li
              onClick={() => {
                clickHandler(item);
                setIsOpen(false);
              }}
              key={item.projectId}
            >
              <button type="button" tabIndex={0}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
