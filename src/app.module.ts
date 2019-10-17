import { Module } from '@nestjs/common';
import { AdmModule } from 'src/modules/adm/adm.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    AdmModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
