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
});
