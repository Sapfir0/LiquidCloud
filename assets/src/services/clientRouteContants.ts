const ClientRoutes = {
    Index: '/home',
    Login: '/login',
} as const;

export type ClientRouteType = typeof ClientRoutes[keyof typeof ClientRoutes];

export { ClientRoutes };

