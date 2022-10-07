import react from "react";


const Modal = (props) => {

  


  const {onCancel, onConfirm, title, acıklama} = props;

  return (
    <button onClick={onCancel} 
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        cursor: "default"
      }}
    >
      <div
        style={{
          width: "50%",
          backgroundColor: "white",
          textAlign: "center",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div className="modal-content">
          <div>
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <p>{acıklama}</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              onClick={onCancel}
              className="btn btn-outline-danger mx-1"
              data-bs-dismiss="modal"
            >
              Kapat
            </button>
            <button
            onClick={onConfirm}
            className="btn btn-outline-success">
              Onayla
            </button>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Modal;
