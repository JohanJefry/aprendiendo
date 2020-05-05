//Dependencias

import crypto from 'crypto'

//Configuration
import { $security } from '../../config'

export function encrypt(str) {
    return crypto
        .createHash('sha1')
        .update(`${$security().secretKey}${str.toString()}`)
        .digest('hex')
}
//Lo q hace encryp desde (ocnfig.json) Gr4pQLCMSJef + pswr