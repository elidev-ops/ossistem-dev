const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

module.exports = {
  async session(req, res) {
    const { id } = req.body;
    try {
      const [user] = await connection('users')
        .select(['id', 'name'])
        .where('id', id);

      if (!user) {
        return res.status(500).json({ msg: 'Usuario invalido' });
      }

      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRES,
      });

      return res.json({
        user,
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error, msg: 'Ocorreu um erro tente novamente' });
    }
  },
};
