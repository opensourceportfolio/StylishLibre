import { GlucoseData } from '../../model/api/glucose-data';
import { Attempt } from '../../model/response';
import { failure, json } from '../fetch';

export async function getGlucoseData(token: string): Attempt<GlucoseData[]> {
  try {
    console.log('getGlucoseData start');

    const res = json<GlucoseData[]>(
      'https://us-central1-freestyle-libre-api.cloudfunctions.net/getGlucoseData',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      },
    );

    const data = await res;

    // console.log("getGlucoseData", { type: data.type });

    console.log('getGlucoseData done');

    return data;
  } catch (e) {
    console.log('getGlucoseData failed');

    return failure(e.message, undefined, e);
  }
}
