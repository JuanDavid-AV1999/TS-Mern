import { IAuth, IUser } from '../interfaces/app';
import { exec } from '../config/DBConnection';

export const getAll = async (): Promise<IUser[]> => {
    const select: string =
        'user.user_id, user.name, user.last_name, user.email, user.pass, rol.rol';
    const join: string = 'rol ON (user.rol_id = rol.rol_id)';
    const query: string = `SELECT ${select} FROM user INNER JOIN ${join}`;

    return await exec<IUser[]>(query);
};

export const get = async ({ email, pass }: IAuth): Promise<IUser> => {
    const select: string =
        'user.user_id as userId, user.name, user.last_name as lastName, user.email, user.pass, rol.rol';
    const join: string = 'rol ON (user.rol_id = rol.rol_id)';
    const where: string = 'email = ? AND pass = ?';

    const query: string = `SELECT ${select} FROM user INNER JOIN ${join} WHERE ${where} LIMIT 1`;
    const user = await exec<IUser[]>(query, [email, pass]);
    return user[0];
};

export const create = async ({
    name,
    last_name,
    email,
    pass,
    rol,
}: IUser): Promise<boolean> => {
    const fileds: string = '(name, last_name, email, pass, rol_id)';
    const values: string = '(?, ?, ?, ?, ?)';

    const query: string = `INSERT INTO user ${fileds} VALUES ${values}`;
    const { affectedRows } = await exec<{ affectedRows: number }>(query, [
        name,
        last_name,
        email,
        pass,
        rol,
    ]);
    return affectedRows > 0;
};

export const update = async (data: any): Promise<boolean> => {
    let fields = '';
    for (const key in data) fields += `${key} = ?, `;
    fields = fields.slice(0, -2);

    const query: string = `UPDATE user SET ${fields} WHERE user_id = ${data.user_id}`;
    const { affectedRows } = await exec<{ affectedRows: number }>(query, Object.values(data));
    return affectedRows > 0;
}
