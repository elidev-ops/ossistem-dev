const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { userId } = req;
    try {
      const os = await connection('os')
        .where('os.user_id', userId)
        .join('clients', 'os.client_id', 'clients.id')
        .join('products', 'os.product_id', 'products.id')
        .select([
          'os.*',
          'clients.name',
          'clients.email',
          'clients.tel',
          'clients.whatsapp',
          'clients.uf',
          'clients.city',
          'clients.address',
          'clients.cpf',
          'products.type',
          'products.brand',
          'products.model',
          'products.sn',
        ]);

      return res.json(os);
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Ocorreu um erro tente novamente' });
    }
  },
  async create(req, res) {
    const { userId } = req;
    const {
      client_id,
      product_id,
      condition,
      defects,
      accessories,
      solution,
      report,
      terms,
      value,
    } = req.body;

    try {
      await connection('os').insert({
        user_id: userId,
        client_id,
        product_id,
        condition,
        defects,
        accessories,
        solution,
        report,
        terms,
        value,
        status: false,
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

    const { user_id } = await connection('os')
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
      await connection('os').where('id', id).update(data);
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

    const { user_id } = await connection('os')
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
      await connection('os').where('id', id).del();
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Ocorreu um erro tente novamente' });
    }
  },
};
