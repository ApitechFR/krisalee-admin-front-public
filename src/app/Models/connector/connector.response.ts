
export class alertUsersConnectorResponse {

  connector_id: string;

  name: string;

  description: string;

  is_running: boolean;

  last_run_status: boolean;

  last_run_datetime: Date;

  depends_on: string[];

  alertedUsers: number;
  alreadyEnabledUsers: number;
  failedUsers: number;
}
