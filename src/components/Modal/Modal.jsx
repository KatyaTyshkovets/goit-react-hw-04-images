import PropTypes from 'prop-types';
import  {useEffect, useRef} from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalBox } from "./Modal.styled";


const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
   const isFirstRender = useRef(true);
  useEffect(() => {
   
    if (isFirstRender.current) {
      window.addEventListener('keydown', closeModal);
      isFirstRender.current = false;
      return;
    }
    
    return () => { window.removeEventListener('keydown', closeModal); }
    
    }
);

 const closeModal = ({code, target, currentTarget}) => {
  if(code === 'Escape' || target === currentTarget){
    onClose();
  };
};

return createPortal(
  <Overlay onClick={onClose}>
    <ModalBox>{children}</ModalBox>
  </Overlay>,
  modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};



export default Modal