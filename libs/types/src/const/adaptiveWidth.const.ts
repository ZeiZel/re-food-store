export const IS_PHONE = 576;
export const IS_TABLET = 768;
export const IS_NETBOOK = 991;
export const IS_LAPTOP = 1200;

export enum EDevice {
	PHONE = 'Phone',
	TABLET = 'Tablet',
	NETBOOK = 'Netbook',
	LAPTOP = 'Laptop',
}

export const DEVICE_WINDOW_SIZE: Record<EDevice, number> = {
	[EDevice.PHONE]: IS_PHONE,
	[EDevice.TABLET]: IS_TABLET,
	[EDevice.NETBOOK]: IS_NETBOOK,
	[EDevice.LAPTOP]: IS_LAPTOP,
};
