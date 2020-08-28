import AppError from '@shared/errors/AppErrors';

import CreateAgendamentoService from './CreateAgendamentoService';
import FakeAgendamentoRepository from '../repositories/fakes/FakeAgendamentoRepository';

describe('CreateAgendamento', () => {
  it('Deve permitir a criação de um novo agendamento', async () => {
    const fakeAgendamento = new FakeAgendamentoRepository();
    const createAgendamento = new CreateAgendamentoService(fakeAgendamento);

    const agendamento = await createAgendamento.execute({
      date: new Date(),
      provider_id: '123123123',
    });
    expect(agendamento).toHaveProperty('id');
    expect(agendamento.provider_id).toBe('123123123');
  });

  it('Não deve permitir uma criação de agendamento na mesma data', async () => {
    const fakeAgendamento = new FakeAgendamentoRepository();
    const createAgendamento = new CreateAgendamentoService(fakeAgendamento);

    const agendamentoDate = new Date(2020, 4, 10, 11);

    await createAgendamento.execute({
      date: agendamentoDate,
      provider_id: '123123123',
    });

    expect(
      createAgendamento.execute({
        date: agendamentoDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
