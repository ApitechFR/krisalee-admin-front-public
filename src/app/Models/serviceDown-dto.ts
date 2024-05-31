export class serviceDownDTO {
    public services: service[] = [];
}

export class service{
    service_id : string;

    snapshot_id?: string;

    save_snapshot: boolean;

    comment?: string;
}