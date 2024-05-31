import { AlertLevelEnum } from "../enums/alertUsers.enum";
import { SmsHeaderEnum } from "../enums/smsHeader";

export class RunConnectorDto {
    frequency: string;
    alert_level: AlertLevelEnum;
    sms_header: SmsHeaderEnum;

    services: ServiceType[];
  }
  
  export class ServiceType {
    service_id: string;
    snapshot_id: string;
  }