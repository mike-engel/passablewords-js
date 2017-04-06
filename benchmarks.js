const Benchmark = require('benchmark');
const {
  checkEntropy,
  checkLength,
  checkPassword,
  checkUniqueness
} = require('./index');

const suite = new Benchmark.Suite();

suite
  .add('checkLength promise', {
    defer: true,
    fn: deferred => {
      checkLength('password')
        .then(() => deferred.resolve())
        .catch(() => deferred.resolve());
    }
  })
  .add('checkLength callback', {
    defer: true,
    fn: deferred => {
      checkLength('password', () => deferred.resolve());
    }
  })
  .add('checkEntropy promise', {
    defer: true,
    fn: deferred => {
      checkEntropy('tH1s i5_A r4nd0m p2s5w0rd')
        .then(() => deferred.resolve())
        .catch(() => deferred.resolve());
    }
  })
  .add('checkEntropy callback', {
    defer: true,
    fn: deferred => {
      checkEntropy('tH1s i5_A r4nd0m p2s5w0rd', () => deferred.resolve());
    }
  })
  .add('checkUniqueness promise', {
    defer: true,
    fn: deferred => {
      checkUniqueness('this should be unique')
        .then(() => deferred.resolve())
        .catch(() => deferred.resolve());
    }
  })
  .add('checkUniqueness callback', {
    defer: true,
    fn: deferred => {
      checkUniqueness('this should be unique', () => deferred.resolve());
    }
  })
  .add('checkPassword promise', {
    defer: true,
    fn: deferred => {
      checkPassword('tH1s i5_A unique r4nd0m p2s5w0rd')
        .then(() => deferred.resolve())
        .catch(() => deferred.resolve());
    }
  })
  .add('checkPassword callback', {
    defer: true,
    fn: deferred => {
      checkPassword('tH1s i5_A unique r4nd0m p2s5w0rd', () =>
        deferred.resolve());
    }
  })
  .on('cycle', evt => {
    console.log(String(evt.target));
  })
  .run({ async: true });
