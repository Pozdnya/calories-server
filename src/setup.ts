import { client } from "./db";
import { Product } from "./models/product";
import 'dotenv/config'

async function initDb() {
  try {
    await Product.sync({force: true})
  } catch (error) {
    console.error(error)
  }
} 

initDb()