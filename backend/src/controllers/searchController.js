const connection = require('../database/connection');

module.exports = {
  async search(req, res) {
    const { userId } = req;
    const { query } = req.query;
    const clients = await connection('clients')
        .where('name', 'like', `%${query}%`)
        .andWhere('user_id', userId)
        .select('*');
    return res.json(clients)
  }
}