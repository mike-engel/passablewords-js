# passablewords

`passablewords` is a password validation library which checks a password against a million of
the most common as well as it's ability to be cracked.

If you're asking why use `passablewords` over [`zxcvbn`](https://github.com/dropbox/zxcvbn), it's because `passablewords` checks
a password against 1,000,000 of the most common passwords. `zxcvbn` only checks 30,000.
`zxcvbn` is a great tool, however, and `passablewords` uses it to check the entropy of a given
password to make sure it's random enough on top of being unique enough. If you are ok with the
top 30,000 most common passwords, then you should probably use `zxcvbn`. If you want a little
extra, consider `passablewords`.

While you're free to use any of the public methods, using the `checkPassword` function is
recommended since that checks for length, uniqueness, and entropy all within a single call.

It's also important to note that this is provided as-is and doesn't prevent an attacker from
gaining access to, decrypting, or guessing your user's passwords. It just makes it a little
harder.

# Installing `passablewords`

```
npm install -S passablewords
```

# Using `passablewords`

The most basic usage of `passablewords` will be through the `checkPassword` function, which
will check the length, uniqueness, and entropy of a given password.

For more documentation, see the [API docs](#api) below.

```js
const { checkPassword } = require('passablewords');

checkPassword('P@ssw0rd!')
  .then(() => {
    console.log('The password is alright!');
  })
  .catch(err => {
    console.error(`The password isn't great and here's why: ${err.message}`);
  })
```

# Performance

`passablewords` should be fast enough for most cases. If you see room for improvement, please
file an issue or submit a PR!

## Benchmarks

You can run the benchmarks yourself with `node benchmarks.js`. Here are some results
that have been collected.

#### 2013 MacBook Air / macOS 10.12 / Intel Core i7 / Node 6.10.1
```
checkLength promise x 321,457 ops/sec ±3.00% (69 runs sampled)
checkLength callback x 188,529 ops/sec ±18.36% (19 runs sampled)
checkEntropy promise x 224 ops/sec ±2.67% (74 runs sampled)
checkEntropy callback x 230 ops/sec ±2.15% (74 runs sampled)
checkUniqueness promise x 296,860 ops/sec ±5.19% (69 runs sampled)
checkUniqueness callback x 176,431 ops/sec ±9.37% (21 runs sampled)
checkPassword promise x 133 ops/sec ±1.78% (73 runs sampled)
checkPassword callback x 130 ops/sec ±2.28% (72 runs sampled)
```

# API

There are four main functions available for you to use. All four of these functions provide
both promise and callback variants. There are no synchronous versions available.

## `checkPassword`

`checkPassword` is the recommended method to use to verify a password. It runs all the other
three functions which check for length, uniqueness, and entropy (randomness). The error returned
will be one of the available [error types](#errors).

```js
const { checkPassword } = require('passablewords');

// callback style
checkPassword('this is the password', (err, valid) => {
  if (err) {
    return console.error(`That password is simply no good and here's why: ${err.message}`);
  }

  console.log(`That's a really nice password you have there!`);
});

// promise style
checkPassword('this is the password')
  .then(valid => {
    console.log(`That's a really nice password you have there!`);
  })
  .catch(err => {
    console.error(`That password is simply no good and here's why: ${err.message}`);
  });
```

## `checkLength`

`checkLength` is one of the sub functions available that will ensure the password is longer
than 8 characters. Using only this function is not recommended since it doesn't add much
valie. The error returned will be one of the available [error types](#errors).

```js
const { checkLength } = require('passablewords');

// callback style
checkLength('this is the password', (err, valid) => {
  if (err) {
    return console.error(`That password is simply too short.`);
  }

  console.log(`That's kind of a long password you have there!`);
});

// promise style
checkLength('this is the password')
  .then(valid => {
    console.log(`That's kind of a long password you have there!`);
  })
  .catch(err => {
    console.error(`That password is simply too short.`);
  });
```

## `checkUniqueness`

`checkUniqueness` is one of the sub functions available that will ensure the password is not
in the list of the top one million common passwords. The error returned will be one of the
available [error types](#errors).

```js
const { checkUniqueness } = require('passablewords');

// callback style
checkUniqueness('this is the password', (err, valid) => {
  if (err) {
    return console.error(`That password is simply too common.`);
  }

  console.log(`That's a pretty unique password you have there!`);
});

// promise style
checkUniqueness('this is the password')
  .then(valid => {
    console.log(`That's a pretty unique password you have there!`);
  })
  .catch(err => {
    console.error(`That password is simply too common.`);
  });
```

## `checkEntropy`

`checkEntropy` is one of the sub functions available that will ensure the password is
sufficiently random in an effort to dissuade hackers from attempting to crack or guess it.
The error returned will be one of the available [error types](#errors).

```js
const { checkEntropy } = require('passablewords');

// callback style
checkEntropy('this is the password', (err, valid) => {
  if (err) {
    return console.error(`That password is not random enough.`);
  }

  console.log(`That's a pretty random password you have there!`);
});

// promise style
checkEntropy('this is the password')
  .then(valid => {
    console.log(`That's a pretty random password you have there!`);
  })
  .catch(err => {
    console.error(`That password is not random enough.`);
  });
```

## Errors

There are three possible errors that can be returned from the functions described above.

```js
const {
  checkPassword,
  EntropyError,
  LengthError,
  UniquenessError
} = require('passablewords');

checkPassword('this is a password')
  .then(valid => {

  })
  .catch(err => {
    if (err instanceof EntropyError) {
      console.error(`That password isn't random enough.`);
    } else if (err instanceof LengthError) {
      console.error(`That password needs to be longer than 8 characters`);
    } else if (err instanceof UniquenessError) {
      console.error(`That password is too common, and should be more unique.`);
    } else {
      console.error(`Darn it, something went terribly wrong in our password library`);
    }
  })
```

# Developing

First you'll need to have Node installed. How you install it is up to you. I personally prefer
[nvm](https://github.com/creationix/nvm) through [homebrew](https://brew.sh).

Since Node comes with npm installed, you should download the project's dependencies next.

```sh
npm install
```

It would be a good idea at this point to make sure all the tests pass so let's run the tests.

```sh
npm test
```

The code should be formatted with [prettier](). When you run `npm install`, a git commit hook
should be added automatically for you, which will format before the code is committed.

Finally, make any changes you want and submit a [pr](https://github.com/mike-engel/passablewords-js/pulls/new). Thanks in advance!

# [Code of Conduct](code_of_conduct.md)

# [License](LICENSE.md)

The code for this library is licensed under the MIT license.

The list of passwords is licensed under the [Creative Commons Attribution ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license.

Thanks to the [SecLists](https://www.owasp.org/index.php/Projects/OWASP_SecLists_Project) project for the list.

# [Changelog](CHANGELOG.md)
