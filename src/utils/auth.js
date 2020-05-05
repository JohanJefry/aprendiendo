//Dependencies
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

//utils
import { encrypt, setBase64 } from './security';
import { isPasswordMatch } from './is';

//configuration
import { $security } from '../../config';

const createToken = async(user) => { //despues de crear y validar user
    const { id, username, password, email, privilege, active } = user;
    // console.log('ID=== ', id); //para ver si obtenemos id
    const token = setBase64(`${encrypt($security().secretKey)}${password}`); //llama a token en si el password para confundir a un kach y le agrega el paswword en hash
    // console.log('TOKEN=== ', token);
    const userData = {
        id,
        username,
        email,
        privilege,
        active,
        token
    };
    // console.log('USERDATA==== ', userData);
    const createTk = jwt.sign( //firma sign
        { data: setBase64(userData) }, //la informacion del user se ofusca
        $security().secretKey, { expiresIn: $security().expiresIn }
    );

    // console.log('PROMISE=== ', createTk);
    return Promise.all([createTk]);
}

export const doLogin = async(email, password, models) => {
    const user = await models.User.findOne({ //findOne devuelve la pprimera aparicion de una bd (metodo node)
        where: { email },
        raw: true
    });

    if (!user) {
        throw new AuthenticationError('Invalid Login');
    }
    //console.log('USER === ', user);

    const passwordMatch = isPasswordMatch(encrypt(password), user.password); //compara el password(obtenido por grapql) con el de la base de datos
    const isActive = user.active; //ver si un user esta acitvo

    if (!passwordMatch) {
        throw new AuthenticationError('Invalid Login');
    }

    if (!isActive) {
        throw new AuthenticationError('Your account is not acrivated yet');
    }

    const [token] = await createToken(user);

    return {
        token
    }
}