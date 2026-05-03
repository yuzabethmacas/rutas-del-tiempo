import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { TurismoModule } from './turismo/turismo.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    TurismoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
