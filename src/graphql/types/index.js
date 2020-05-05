import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'


const typesArray = fileLoader(path.join(__dirname, './')); // para importar todos los types de la carpeta type

export default mergeTypes(typesArray, { all: true }) // control manual de cada archivo que se fusiona (all:true Solo se usa si ha definido el mismo tipo varias veces)