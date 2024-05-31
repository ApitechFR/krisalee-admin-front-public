export class serviceUpDTO {
    alert_level_0?: boolean;

    public services: service[] = [];

    tag_id?: string;
    mode_id?:string;

}

export class service{
    service_id : string;

    snapshot_id: string;
}
