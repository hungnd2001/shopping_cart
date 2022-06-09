import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "123456",
    password: "123456",
    database: "shopping_cart",
    synchronize: true,
    logging: false,
    entities: ["models/*.ts"],
    migrations: ["database/migration/*.ts"],
})


export default AppDataSource;