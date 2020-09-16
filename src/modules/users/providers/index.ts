import { container } from 'tsyringe';

import IHashInterface from './HashProvider/models/HashInterface';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashInterface>('HashProvider', BCryptHashProvider);
