import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    return {
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        url: process.env.DB_URL,
    };
});
