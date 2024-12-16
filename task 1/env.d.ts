declare namespace NodeJS{
    interface ProcessENV{
        readonly PORT: string,
        readonly DB: string,
        readonly NODE_ENV: 'development' | 'production';
        readonly BASE_URL: string;
        readonly JWT_SECRET: string;
        readonly JWT_EXPIRE: string;
        readonly JWT_SECRET_RESET : string;
        readonly JWT_EXPIRE_RESET : string;
        readonly APP_NAME: string;
        readonly GOOGLE_CALLBACK: string;
        readonly GOOGLE_CLIENT_ID: string;
        readonly GOOGLE_CLIENT_SECRET:string;

    }
}