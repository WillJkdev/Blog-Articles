import { db, User } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      id: 'g1frmv5osbojzot',
      username: 'admin',
      email: 'admin@gmail.com',
      password:
        '$argon2id$v=19$m=19456,t=2,p=1$R+3mzyiW75oCwc9z5MdEIQ$D/cjMziGMRsbQgB93A/hmcms69SRof5g69p6odoIWC8',
    },
    {
      id: 'vj5dkg9685jwamx',
      username: 'Guest',
      email: 'user@example.com',
      password:
        '$argon2id$v=19$m=19456,t=2,p=1$M+1QiAIomkbX/bfH6u+keg$rgtFRGRV1rLO2SuAu/giFRJCZvs3UteCr8wv2bKgVLA',
    },
  ]);
}
