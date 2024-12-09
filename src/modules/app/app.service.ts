import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/config';

@Injectable()
export class AppService {

  constructor(apiConfigService: ApiConfigService) {
    if (apiConfigService.isAuthEnabled) {
      // Authentication is enabled
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
  