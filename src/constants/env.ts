

const getEnv = (key: string, defaultValue?: string): string => {
    const value =  process.env[key] || defaultValue;

    if(value === undefined) {
        throw Error(`Missing environment variable: ${key}`);
    }
    return value;
}
export const NODE_ENV = getEnv('NODE_ENV');
export const PORT_URL = getEnv('PORT', '3000');
export const JWT_KEY = getEnv('SECRET_KEY');
export const DB_PORT = getEnv('DB_PORT'); 
export const DB_HOST = getEnv('DB_HOST'); 
export const DB_USERNAME = getEnv('DB_USERNAME'); 
export const DB_PASSWORD = getEnv('DB_PASSWORD');
export const DB_NAME = getEnv('DB_NAME', "DB_NAME")