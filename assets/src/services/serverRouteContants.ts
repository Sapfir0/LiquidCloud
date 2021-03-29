export const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const FILE_HIGH_LEVEL_DOMAIN = '/files';
const FILE = {
    GET_ALL_FILES: `${FILE_HIGH_LEVEL_DOMAIN}`,
};

const SEARCH_HIGH_LEVEL_DOMAIN = '/search';
const SEARCH = {
    GET_SEARCH: `${SEARCH_HIGH_LEVEL_DOMAIN}`,
};

export const ApiRoutes = { FILE, SEARCH } as const;
