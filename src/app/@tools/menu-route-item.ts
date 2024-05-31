interface MenuRouteItemOptions
{
    parent?: MenuRouteItem;
    path: string;
    title?: string;
    icon?: string;
}

export class MenuRouteItem implements MenuRouteItemOptions
{
    parent?: MenuRouteItem;
    path: string;
    title?: string;
    icon?: string;

    constructor({ parent, path, title, icon } : MenuRouteItemOptions)
    {
        this.parent = parent;
        this.path = path;
        this.title = title;
        this.icon = icon;        
    }

    /**
     * Builds the link of an element, using its path,
     * its parent(s)'s path(s), and slashes
     * 
     * @returns a string containing the link
     */
    getLink()
    {
        let returnPath = this.path;
        let currentItem = this as MenuRouteItem;

        while(currentItem.parent)
        {
            // Concat item path with parent path
            returnPath = `${currentItem.parent.path}/${returnPath}`;

            // Move up one level
            currentItem = currentItem.parent;
        }

        // console.log('Route', this.title, returnPath);
        
        return `/${returnPath}`;
    }
}