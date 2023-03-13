import { createPool } from 'mysql';
import { connectionParams } from '../interfaces/app';

const CONFIG: connectionParams = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mern_auth',
};

const connection = createPool(CONFIG);

const exec = <T>(query: string, params?: Array<string> | object): Promise<T> => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const DBLisener = (): void => {
    connection.getConnection((err) => {
        if (err) console.log('BD Connection Error ', err.message);

        console.log('BD Connection Success');
    });
};

export { DBLisener, exec };
