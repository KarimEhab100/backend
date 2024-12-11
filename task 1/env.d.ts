declare namespace NodeJS{
    interface ProcessENV{
        readonly PORT: string,
        readonly DB: string,
        readonly NODE_ENV: 'development' | 'production';
        readonly BASE_URL: string;
        readonly JWT_SECRET: string;
        readonly JWT_EXPIRE: string;
    }
}