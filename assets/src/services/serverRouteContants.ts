export const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const FILES_HIGH_LEVEL_DOMAIN = '/files';
const FILE_HIGH_LEVEL_DOMAIN = '/file';

const FILE = {
    GET_ALL_FILES: `${FILES_HIGH_LEVEL_DOMAIN}`,
    GET_FILE: (filename: string) => `${FILE_HIGH_LEVEL_DOMAIN}/?path=${filename}`,
};

const SEARCH_HIGH_LEVEL_DOMAIN = '/search';
const SEARCH = {
    GET_SEARCH: `${SEARCH_HIGH_LEVEL_DOMAIN}`,
};

export const ApiRoutes = { FILE, SEARCH } as const;
