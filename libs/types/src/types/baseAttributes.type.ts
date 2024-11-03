import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	HTMLAttributes,
	ImgHTMLAttributes,
	InputHTMLAttributes,
} from 'react';

export type IInputAttributes = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type IDivAttributes = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type IAnchorAttributes = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export type IImageAttributes = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export type IPAttributes = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export type IHeadingAttributes = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export type IDividerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;

export type IButtonAttributes = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
