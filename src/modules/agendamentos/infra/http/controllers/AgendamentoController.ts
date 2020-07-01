import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAgendamentoService from '@modules/agendamentos/services/CreateAgendamentoService';

export default class AgendamentoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const dataParsed = parseISO(date);

    const createAgendamento = container.resolve(CreateAgendamentoService);

    const agendamento = await createAgendamento.execute({
      date: dataParsed,
      provider_id,
    });

    return response.json(agendamento);
  }
}
