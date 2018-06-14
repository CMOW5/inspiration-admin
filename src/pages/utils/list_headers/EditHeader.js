import React from 'react';

import './edit-header.css';

/**
 *
 * @param {*} props
 * @return {ReactNode}
 */
function EditHeader(props) {
  const title = props.title;
  const icon = props.icon;

  return (
    <div className="edit-header">

      <span>
        <i className={icon}></i>
      </span>

      <span className="edit-title">{title}</span>

    </div>
  );
}

export default EditHeader;
