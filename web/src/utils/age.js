import moment from 'moment';

export default (t, birthday) => t('age', { years: moment().diff(birthday, 'years') });
