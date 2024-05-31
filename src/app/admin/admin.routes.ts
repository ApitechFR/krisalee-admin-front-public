import { MenuRouteItem } from '../@tools/menu-route-item';

export const AdminRoot = new MenuRouteItem(
    {
        path: 'admin',
        title: 'Administration',
        icon: 'alert-circle',
    }
);

export const Root = new MenuRouteItem(
    {
        parent: AdminRoot,
        path: 'admin',
        title: 'Administration',
        icon: 'alert-circle',
    }
);

export const AdminNotFound = new MenuRouteItem(
    {
        parent: AdminRoot,
        path: '404',
        title: 'Not Found',
        // icon: 'alert-circle',
    }
);

export const AdminHome = new MenuRouteItem(
    {
        parent: AdminRoot,
        path: 'home',
        title: 'Vue d\'ensemble',
        icon: 'home-outline',
    }
);

export const AdminConfig = new MenuRouteItem(
    {
        parent: AdminRoot,
        path: 'config',
        title: 'Configuration',
        // icon: 'alert-circle',
    }
);

export const AdminConfigAdminServices = new MenuRouteItem(
    {
        parent: AdminConfig,
        path: 'admin-services',
        title: 'Services',
        icon: 'lock',
    }
);

export const AdminConfigDataImportation = new MenuRouteItem(
    {
        parent: AdminConfig,
        path: 'data-importation',
        title: 'Connecteurs',
        icon: 'cloud-upload',
    }
);

export const AdminConfigAdminUsers = new MenuRouteItem(
    {
        parent: AdminConfig,
        path: 'admin-users',
        title: 'Utilisateurs',
        icon: 'person',
    }
)

export const AdminConfigTags = new MenuRouteItem(
    {
        parent: AdminConfig,
        path: 'admin-tags',
        title: 'Étiquettes',
        icon: 'pricetags-outline',
    }
)