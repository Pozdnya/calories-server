import 'dotenv/config'
import { models } from "./models";

async function initDb() {
  try {
    await Promise.all(models.map(async (model) => await model.sync({ force: true })));
  } catch (error) {
    console.error(error)
  }
}

initDb()