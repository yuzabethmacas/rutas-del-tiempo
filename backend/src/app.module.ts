import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TurismoModule } from './turismo/turismo.module';

@Module({
  imports: [TurismoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
