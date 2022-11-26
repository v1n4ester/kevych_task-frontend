import { useState } from "react";

const Selector = (props) => {
    const [showOptionList, setShowOptionsist] = useState(false)
    const [defaultSelectText, setDefaultSelectedText] = useState('Sorting')

    const handleOptionClick = (e) => {
        setDefaultSelectedText(e.target.getAttribute("data-name"))
        setShowOptionsist(false)
        props.onClick(e.target.getAttribute("data-name"))
    }
  return (
    <div className="custom-select-container">
      <div
        className={showOptionList ? "selected-text active" : "selected-text"}
        onClick={() => setShowOptionsist(!showOptionList)}
      >
        {defaultSelectText}
      </div>
      {showOptionList && (
        <ul className="select-options">
              <li
                className="custom-select-option"
                data-name='Alphabet'
                onClick={handleOptionClick}
              >
                Alphabet
              </li>
              <li
                className="custom-select-option"
                data-name='Date'
                onClick={handleOptionClick}
              >
                Date
              </li>
        </ul>
      )}
    </div>
  );
};

export default Selector;
