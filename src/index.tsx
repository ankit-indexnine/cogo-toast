import React from 'react';
import ReactDOM from 'react-dom/client';

import ToastContainer from './components/ToastContainer';
import Toast from './components/Toast';

import { CToast, CTReturn } from '../index.d';

import './styles/styles.css';

let ctToastCount = 0;
let root;

const cogoToast: CToast = (text, options?) => {
	let rootContainer = document.getElementById(options?.toastContainerID || 'ct-container');

	if (!rootContainer) {
		rootContainer = document.createElement('div');
		rootContainer.id = 'ct-container';
		document.body.appendChild(rootContainer);
	}

	if(ctToastCount === 0){
		root = ReactDOM.createRoot(rootContainer);
	}

	ctToastCount += 1;

	const hideTime = (options?.hideAfter === undefined ? 3 : options.hideAfter) * 1000;
	const toast = { id: ctToastCount, text, ...options };

	root.render(<ToastContainer toast={toast} />);

	const hide = () => {
		root.render(<ToastContainer hiddenID={toast.id} />);
	};

	const completePromise: CTReturn = new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, hideTime);
	});

	completePromise.hide = hide;

	return completePromise;
};

cogoToast.success = (t, o) => cogoToast(t, { ...o, type: 'success' });
cogoToast.warn = (t, o) => cogoToast(t, { ...o, type: 'warn' });
cogoToast.info = (t, o) => cogoToast(t, { ...o, type: 'info' });
cogoToast.error = (t, o) => cogoToast(t, { ...o, type: 'error' });
cogoToast.loading = (t, o) => cogoToast(t, { ...o, type: 'loading' });

export { Toast };

export default cogoToast;
