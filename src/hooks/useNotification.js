import { store } from 'react-notifications-component';

export const useCustomNotification = ({ title, message, type, container }) => {
	store.addNotification({
		title: title,
		message: message,
		type: type,
		insert: 'center',
		container: container,
		animationIn: [ 'animated', 'fadeIn' ],
		animationOut: [ 'animated', 'fadeOut' ],
		dismiss: {
			duration: 5000,
			onScreen: true
		}
	});
};

export const useDangerNotification = ({ title, message }) => {
	store.addNotification({
		title: title,
		message: message,
		type: 'danger',
		insert: 'center',
		container: 'bottom-left',
		animationIn: [ 'animated', 'fadeIn' ],
		animationOut: [ 'animated', 'fadeOut' ],
		dismiss: {
			duration: 5000,
			onScreen: true
		}
	});
};
export const useSuccessNotification = ({ title, message }) => {
	store.addNotification({
		title: title,
		message: message,
		type: 'success',
		insert: 'center',
		container: 'bottom-left',
		animationIn: [ 'animated', 'fadeIn' ],
		animationOut: [ 'animated', 'fadeOut' ],
		dismiss: {
			duration: 5000,
			onScreen: true
		}
	});
};
