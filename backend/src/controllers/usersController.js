const crypo = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const users = await connection('users')
      .select('*')
      .limit(5)
      .offset((page - 1) * 5);

    return res.json(users);
  },
  async create(req, res) {
    const id = crypo.randomBytes(4).toString('HEX');
    const { name, email, whatsapp, uf, city, address } = req.body;

    await connection('users').insert({
      id,
      name,
      email,
      whatsapp,
      uf,
      city,
      address,
    });

    return res.json({ id });
  },

  async update(req, res) {
    const user_id = req.userId;

    const user_find = await connection('users')
      .select('id')
      .where('id', user_id)
      .first();
    if (!user_find) {
      return res.status(404).json({ msg: 'Usuario não encontrado' });
    }
    const user = req.body;
    await connection('users').where('id', user_id).update(user);

    return res.json(user);
  },

  async delete(req, res) {
    const { id } = req.params;
    const user_find = await connection('users')
      .select('id')
      .where('id', id)
      .first();
    if (!user_find) {
      return res.status(404).json({ msg: 'Usuario não encontrado' });
    }
    await connection('users').where('id', id).del();

    return res.status(204).send();
  },
};
