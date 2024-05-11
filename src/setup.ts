import 'dotenv/config';
import { models } from './models';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function initDb() {
	try {
		await Promise.all(models.map(async (model) => await model.sync({ force: true })));
	} catch (error) {
		console.error(error);
	}
}

initDb();
