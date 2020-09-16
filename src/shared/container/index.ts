import { container } from 'tsyringe';

import '@modules/users/providers';

import IAgendamentoRepository from '@modules/agendamentos/repositories/InterfaceAgendamentos';
import AgendamentoRepository from '@modules/agendamentos/infra/typeorm/repositories/AgendamentoRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAgendamentoRepository>(
  'AgendamentoRepository',
  AgendamentoRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
