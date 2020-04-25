const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { userId } = req;
    const clients = await connection('clients')
      .select('*')
      .where('user_id', userId);

    return res.json(clients);
  },

  async create(req, res) {
    const user_id = req.userId;
    const { name, email, tel, whatsapp, uf, city, address, cpf } = req.body;
    await connection('clients').insert({
      user_id,
      name,
      email,
      tel,
      whatsapp,
      uf,
      city,
      address,
      cpf,
    });

    return res.json(req.body);
  },

  async update(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const data = req.body;
    const { user_id } = await connection('clients')
      .where('id', id)
      .select('user_id')
      .first();

    if (!user_id) {
      return res.status(404).json({ msg: 'Cliente não encontrado' });
    }

    if (user_id !== userId) {
      return res
        .status(401)
        .json({ msg: 'Você não tem permissão para executar esta ação' });
    }

    await connection('clients').where('id', id).update(data);
    return res.json(req.body);
  },

  async delete(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const { user_id } = await connection('clients')
      .where('id', id)
      .select('user_id')
      .first();

    if (!user_id) {
      return res.status(404).json({ msg: 'Cliente não encontrado' });
    }

    if (user_id !== userId) {
      return res
        .status(401)
        .json({ msg: 'Você não tem permissão para executar esta ação' });
    }

    await connection('clients').where('id', id).del();

    return res.status(204).send();
  },
};
