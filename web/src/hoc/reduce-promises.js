export default args => promises => Promise.all(promises.map(p => (
  typeof p === 'function' ? p(args) : p
)))
  .then(values => Object.assign(
    {},
    ...values.map(value => value || {}),
  ));
