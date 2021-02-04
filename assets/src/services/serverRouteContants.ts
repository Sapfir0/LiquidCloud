export const API_URL = process.env.API_URL || 'http://localhost:4000';

const FILE_HIGH_LEVEL_DOMAIN = '/gallery';
const FILE = {
    GET_ALL_FILES: `${FILE_HIGH_LEVEL_DOMAIN}/`,
};


export const ApiRoutes = { FILE } as const;
