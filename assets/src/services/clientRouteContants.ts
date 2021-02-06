const ClientRoutes = {
    Index: '/home',
} as const;

export type ClientRouteType = typeof ClientRoutes[keyof typeof ClientRoutes];

export { ClientRoutes };
