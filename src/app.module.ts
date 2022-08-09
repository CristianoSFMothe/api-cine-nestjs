import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieModule } from './models/movie/movie.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { SessionsModule } from './models/sessions/sessions.module';
import { RoomsModule } from './models/rooms/rooms.module';
import { ItemsModule } from './models/items/items.module';
import { CombosModule } from './models/combos/combos.module';
import { TicketsModule } from './models/tickets/tickets.module';
import { SalesModule } from './models/sales/sales.module';
import { UsersModule } from './models/users/users.module';
import { AddressModule } from './models/address/address.module';
import { CardsModule } from './models/cards/cards.module';
import { PaymentModule } from './models/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MovieModule,
    SessionsModule,
    RoomsModule,
    ItemsModule,
    CombosModule,
    TicketsModule,
    SalesModule,
    UsersModule,
    AddressModule,
    CardsModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
