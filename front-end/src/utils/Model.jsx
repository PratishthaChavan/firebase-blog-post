import React from 'react'

const Model = ({ children, modal, setModal }) => {
  return (
    <>
      {/* Modal Overlay */}
      {modal && (
        <div 
          id="modal-container"
          onClick={(e) => {
            if (e.target.id === 'modal-container') {
              setModal(false);
            }
          }}
          className="bg-white/50 fixed inset-0 z-50"
        ></div>
      )}

      {/* Modal Content */}
      <div className={`${modal ? "z-50" : ""}`}>
        {children}
      </div>
    </>
  );
};

export default Model;
