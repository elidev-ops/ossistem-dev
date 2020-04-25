const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { userId } = req;
    try {
      const clients = await connection('products')
        .select('*')
        .where('user_id', userId);

      return res.json(clients);
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Ocorreu um erro tente novamente' });
    }
  },
  async create(req, res) {
    const { userId } = req;
    const { client_id, type, brand, model, sn } = req.body;
    try {
      await connection('products').insert({
        user_id: userId,
        client_id,
        type,
        brand,
        model,
        sn,
      });

      return res.json(req.body);
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Ocorreu um erro tente novamente' });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { userId } = req;
    const data = req.body;

    const { user_id } = await connection('products')
      .where('id', id)
      .select('user_id')
      .first();

    if (!user_id) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    if (user_id !== userId) {
      return res
        .status(401)
        .json({ msg: 'Você não tem permissão para executar esta ação' });
    }

    try {
      await connection('products').where('id', id).update(data);
      return res.json(req.body);
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Ocorreu um erro tente novamente' });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req;

    const { user_id } = await connection('products')
      .where('id', id)
      .select('user_id')
      .first();

    if (!user_id) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    if (user_id !== userId) {
      return res
        .status(401)
        .json({ msg: 'Você não tem permissão para executar esta ação' });
    }

    try {
      await connection('products').where('id', id).del();
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Ocorreu um erro tente novamente' });
    }
  },
};
