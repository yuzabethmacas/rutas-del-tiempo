import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerEspanolGuard extends ThrottlerGuard {
  protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
    throw new ThrottlerException('Límite de solicitudes excedido. Por favor, espere antes de intentar de nuevo.');
  }
}
