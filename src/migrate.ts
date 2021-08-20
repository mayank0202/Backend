import { Customer } from './models/customer.model';
import { Role } from './models/role.model';
import { Users } from './models/users.model';
import {Loopback12Application} from './application';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new Loopback12Application();
  await app.boot();
  await app.migrateSchema({existingSchema,models:['Users','Role','Customer']});

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
