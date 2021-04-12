import { Attempt } from '../../model/response';
import { failure, json } from '../fetch';

export async function login(email: string, password: string): Attempt<string> {
  try {
    console.log('login start');

    const res = json<string>(
      'https://us-central1-freestyle-libre-api.cloudfunctions.net/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: `{ "email": "${email}", "password": "${password}" }`,
      },
    );

    console.log('login', { type: (await res).type });

    return res;
  } catch (e) {
    console.log('login failed');

    return failure(e.message, undefined, e);
  }
}
