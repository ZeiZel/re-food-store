export function isClientSide() {
	return 'document' in globalThis && 'window' in globalThis && 'history' in globalThis;
}

export function isServerSide() {
	return !isClientSide();
}

export const IS_CLIENT = isClientSide();

export const IS_SERVER = isServerSide();

export const IS_LOCALHOST = IS_CLIENT && globalThis.location.hostname === 'localhost';
