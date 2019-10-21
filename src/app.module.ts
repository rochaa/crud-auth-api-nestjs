import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdmModule } from './modules/adm/adm.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.GIDU_CONNECTION_STRING, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    }),
    AdmModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
