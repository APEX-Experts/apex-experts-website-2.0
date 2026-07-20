import * as migration_20260720_120010 from './20260720_120010';
import * as migration_20260720_130056 from './20260720_130056';
import * as migration_20260720_135655 from './20260720_135655';
import * as migration_20260720_135944 from './20260720_135944';

export const migrations = [
  {
    up: migration_20260720_120010.up,
    down: migration_20260720_120010.down,
    name: '20260720_120010',
  },
  {
    up: migration_20260720_130056.up,
    down: migration_20260720_130056.down,
    name: '20260720_130056',
  },
  {
    up: migration_20260720_135655.up,
    down: migration_20260720_135655.down,
    name: '20260720_135655',
  },
  {
    up: migration_20260720_135944.up,
    down: migration_20260720_135944.down,
    name: '20260720_135944'
  },
];
