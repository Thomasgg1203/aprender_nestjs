import * as bcryptts from "bcrypt";

const saltOrRounds = 10;

/**
 * Esta funcion es la encargada de convertir un 
 * texto plano en un encryptado
 * "1234567" -> "12dad12xasf34asd"
 */

async function generateHash(passwordPlain: string): Promise<string>{
    const hash = await bcryptts.hash(passwordPlain, saltOrRounds );
    return hash;
}

/**
 * Esta funcion
 */

async function compareHash(plain:string , hash:string): Promise<string>{
    return bcryptts.compare(plain , hash);
};

export {generateHash, compareHash}
