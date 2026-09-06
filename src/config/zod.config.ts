import { z } from 'zod';


export const validationSchema = z.object({
    DATABASE_HOST: z.string().default("localhost"),
    DATABASE_PORT: z.number().default(27017),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string().default("employee_database"),
    JWT_ACCESS_TOKEN: z.string(),
    SERVER_PORT: z.number().default(3000)
})