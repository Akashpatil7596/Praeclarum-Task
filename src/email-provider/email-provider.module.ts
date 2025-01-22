import { Module } from '@nestjs/common';
import { EmailProviderService } from './email-provider.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: process.env.EMAIL_PROVIDER,
        auth: {
          user: process.env.EMAIL_PROVIDER_USER,
          pass: process.env.EMAIL_PROVIDER_PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL_PROVIDER_USER,
      },
      template: {
        dir: join(__dirname, '../../views/email-template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailProviderService],
  exports: [EmailProviderService],
})
export class EmailProviderModule {}
