import * as migration_20260720_120010 from './20260720_120010';
import * as migration_20260720_130056 from './20260720_130056';
import * as migration_20260720_135655 from './20260720_135655';
import * as migration_20260720_135944 from './20260720_135944';
import * as migration_20260721_130540 from './20260721_130540';
import * as migration_20260721_140015 from './20260721_140015';
import * as migration_20260722_104044 from './20260722_104044';

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
    name: '20260720_135944',
  },
  {
    up: migration_20260721_130540.up,
    down: migration_20260721_130540.down,
    name: '20260721_130540',
  },
  {
    up: migration_20260721_140015.up,
    down: migration_20260721_140015.down,
    name: '20260721_140015',
  },
  {
    up: migration_20260722_104044.up,
    down: migration_20260722_104044.down,
    name: '20260722_104044'
  },
];
