import { Button, Modal as ModalAnt } from 'antd';

interface IModal {
  open: boolean;
  title: string;
  type?: 'default' | 'error';
  textCancel?: string;
  textConfirm?: string;
  disabledConfirmButton?: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
  children: any;
}

const Modal = ({
  open,
  title,
  type,
  textCancel,
  textConfirm,
  disabledConfirmButton,
  children,
  handleClose,
  handleConfirm,
}: IModal) => {
  return (
    <>
      <ModalAnt
        title={title}
        centered
        open={open}
        cancelText={textCancel}
        okText={textConfirm}
        footer={
          <div>
            <Button danger onClick={handleClose}>
              {textCancel || 'Đóng'}
            </Button>
            {!disabledConfirmButton && (
              <Button type="primary" onClick={handleConfirm}>
                {textConfirm || 'Lưu'}
              </Button>
            )}
          </div>
        }
        className={type === 'error' ? 'modal-error' : 'modal-default'}
      >
        {children}
      </ModalAnt>
    </>
  );
};

export default Modal;
