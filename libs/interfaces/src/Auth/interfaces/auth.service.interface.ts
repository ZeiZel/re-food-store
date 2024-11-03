import { z } from 'zod';

export interface ILoginRequest {}

export const LoginResponseSchema = z.object(
	{
		result: z.coerce.boolean(),
		resultMessage: z.coerce.string().optional(),
	},
	{ message: 'К сожалению, вы не авторизованы' },
);
export type ILoginResponse = z.infer<typeof LoginResponseSchema>;
