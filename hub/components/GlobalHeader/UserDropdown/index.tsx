import { pipe } from 'fp-ts/function';

import { useQuery } from '@hub/hooks/useQuery';
import * as RE from '@hub/types/Result';

import { Connect } from './Connect';
import * as gql from './gql';
import { Loading } from './Loading';
import { User } from './User';

interface Props {
  className?: string;
}

export function UserDropdown(props: Props) {
  const [result, refetch] = useQuery(gql.getUserResp, { query: gql.getUser });

  return pipe(
    result,
    RE.match(
      () => (
        <Connect className={props.className} onConnected={() => refetch({})} />
      ),
      () => <Loading className={props.className} />,
      ({ me }) => <User className={props.className} user={me} />,
    ),
  );
}
