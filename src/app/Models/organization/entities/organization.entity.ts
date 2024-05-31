import { OrganizationEnv } from "./organizationEnv.entity";

export class Organization {
  private _organization_id: string;

  name: string;

  is_root: boolean;

  organization_env: OrganizationEnv;


  public constructor(name: string, is_root: boolean, organizationEnv : OrganizationEnv ){
    this.name = name;
    this.is_root = is_root;
    this.organization_env = organizationEnv;
  }

  public get organization_id(): string {
    return this._organization_id;
  }
  public set organization_id(value: string) {
    this._organization_id = value;
  }
}
