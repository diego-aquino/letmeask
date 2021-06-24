import { FC } from 'react';

import AdminViewQuestion, {
  Props as AdminViewQuestionProps,
} from './AdminViewQuestion';
import GuestViewQuestion, {
  Props as GuestViewQuestionProps,
} from './GuestViewQuestion';

type Props =
  | ({ adminView: true } & AdminViewQuestionProps)
  | ({ adminView: false } & GuestViewQuestionProps);

const Question: FC<Props> = ({ adminView, ...rest }) =>
  adminView ? <AdminViewQuestion {...rest} /> : <GuestViewQuestion {...rest} />;

export default Question;
