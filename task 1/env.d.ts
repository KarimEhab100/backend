declare namespace NodeJS{
    interface ProcessENV{
        readonly PORT: string,
        readonly DB: string,
        readonly NODE_ENV: 'development' | 'production';
    }
}