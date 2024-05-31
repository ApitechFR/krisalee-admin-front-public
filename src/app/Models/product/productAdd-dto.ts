export class ProductDTO {

    product_id?: string;
    name: string;
    description?: string;

    service_id: string;
    organizations: string[];
    depends_on: string[];

}