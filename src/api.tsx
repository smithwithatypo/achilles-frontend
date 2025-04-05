// api.tsx

interface ApiConfig {
    baseUrl: string;
}

const devConfig: ApiConfig = {
    baseUrl: 'http://localhost:8080',
};

const prodConfig: ApiConfig = {
    baseUrl: "https://achilles-backend-production.up.railway.app"
};

const isProduction = import.meta.env.PROD;

// Export the config based on the environment
const apiConfig: ApiConfig = isProduction ? prodConfig : devConfig;

export default apiConfig;

// Usage example:
// const response = await fetch(`${apiConfig.baseUrl}/${endpoint}` ... )
