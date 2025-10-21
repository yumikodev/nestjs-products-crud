import { ConfigFactory } from '@nestjs/config';
import Joi from 'joi';

export default new Promise<ConfigFactory>(async (resolve, reject) => {
  try {
    // If it isn't a production environment
    if (process.env.NODE_ENV !== 'production') {
      await import('dotenv/config');
    }

    const schema = Joi.object({
      DATABASE_URL: Joi.string().required(),
    }).unknown(true);

    const { DATABASE_URL } = await schema.validateAsync(process.env);

    resolve(() => ({
      DATABASE_URL,
    }));
  } catch (e) {
    reject(e.message);
  }
});
