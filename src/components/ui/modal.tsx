'use client';

import { createPortal } from 'react-dom';

interface ModalProps extends React.HTMLAttributes<HTMLElement> {
	close: () => void;
	children: React.ReactNode;
}

const ModalCloseButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			className='absolute top-4 right-4 text-foreground hover:text-foreground/80 transition-opacity'
			onClick={onClick}
			aria-label='Close Modal'>
			&times;
		</button>
	);
};

const ModalContent = ({
	close,
	children,
}: {
	close: () => void;
	children: React.ReactNode;
}) => {
	return (
		<aside className='modal'>
			<div>
				<div>
					<ModalCloseButton onClick={close} />
				</div>
				{children}
			</div>
		</aside>
	);
};

const Modal = ({ close, children }: ModalProps) => {
	return createPortal(
		<ModalContent close={close}>{children}</ModalContent>,
		document.body,
	);
};

export default Modal;
