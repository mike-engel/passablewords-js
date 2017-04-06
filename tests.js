const mocha = require('mocha');
const { expect } = require('chai');
const {
  checkEntropy,
  checkLength,
  checkPassword,
  checkUniqueness,
  EntropyError,
  LengthError,
  UniquenessError
} = require('./index');

describe('errors', () => {
  it('should be extended from Error', () => {
    expect(new EntropyError()).to.be.an.instanceOf(Error);
    expect(new LengthError()).to.be.an.instanceOf(Error);
    expect(new UniquenessError()).to.be.an.instanceOf(Error);
  });

  it('should have proper names', () => {
    expect(new EntropyError().name).to.equal('EntropyError');
    expect(new LengthError().name).to.equal('LengthError');
    expect(new UniquenessError().name).to.equal('UniquenessError');
  });

  it('should provide a message', () => {
    expect(new EntropyError().message).to.be.a('string');
    expect(new LengthError().message).to.be.a('string');
    expect(new UniquenessError().message).to.be.a('string');
  });
});

describe('checkLength', () => {
  describe('callback api', () => {
    it('should return true if the length is ok', done => {
      checkLength('this is ok', (err, valid) => {
        if (err) return done(err);

        expect(valid).to.be.true;

        done();
      });
    });

    it('should return an error if the length is not ok', done => {
      checkLength('notok', (err, valid) => {
        if (!err) return done('An error should have been returned');

        expect(err).to.be.an.instanceOf(LengthError);

        done();
      });
    });
  });

  describe('promise api', () => {
    it('should return true if the length is ok', done => {
      checkLength('this is ok')
        .then(valid => {
          expect(valid).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should return an error if the length is not ok', done => {
      checkLength('notok')
        .then(() => done('An error should have been returned'))
        .catch(err => {
          expect(err).to.be.an.instanceOf(LengthError);

          done();
        });
    });
  });
});

describe('checkUniqueness', () => {
  describe('callback api', () => {
    it('should return true if it is unique', done => {
      checkUniqueness('this should not be a common password', (err, valid) => {
        if (err) return done(err);

        expect(valid).to.be.true;

        done();
      });
    });

    it('should return an error if it is too common', done => {
      checkUniqueness('password', (err, valid) => {
        if (!err) return done('An error should have been returned');

        expect(err).to.be.an.instanceOf(UniquenessError);

        done();
      });
    });
  });

  describe('promise api', () => {
    it('should return true if it is unique', done => {
      checkUniqueness('this should not be a common password')
        .then(valid => {
          expect(valid).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should return an error if it is too common', done => {
      checkUniqueness('password')
        .then(() => done('An error should have been returned'))
        .catch(err => {
          expect(err).to.be.an.instanceOf(UniquenessError);

          done();
        });
    });
  });
});

describe('checkEntropy', () => {
  describe('callback api', () => {
    it('should return true if it is pretty random', done => {
      checkEntropy('th1s I5 A_Pre77yR@nd0mP2s5w0rd!', (err, valid) => {
        if (err) return done(err);

        expect(valid).to.be.true;

        done();
      });
    });

    it('should return an error if it is not random enough', done => {
      checkEntropy('not random', (err, valid) => {
        if (!err) return done('An error should have been returned');

        expect(err).to.be.an.instanceOf(EntropyError);

        done();
      });
    });
  });

  describe('promise api', () => {
    it('should return true if it is pretty random', done => {
      checkEntropy('th1s I5 A_Pre77yR@nd0mP2s5w0rd!')
        .then(valid => {
          expect(valid).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should return an error if it is not random enough', done => {
      checkEntropy('not random')
        .then(() => done('An error should have been returned'))
        .catch(err => {
          expect(err).to.be.an.instanceOf(EntropyError);

          done();
        });
    });
  });
});

describe('checkPassword', () => {
  describe('callback api', () => {
    it('should return true if the length is ok', done => {
      checkPassword('this is ok', (err, valid) => {
        if (err) return done(err);

        expect(valid).to.be.true;

        done();
      });
    });

    it('should return true if it is unique', done => {
      checkPassword('this should not be a common password', (err, valid) => {
        if (err) return done(err);

        expect(valid).to.be.true;

        done();
      });
    });

    it('should return true if it is pretty random', done => {
      checkPassword('th1s I5 A_Pre77yR@nd0mP2s5w0rd!', (err, valid) => {
        if (err) return done(err);

        expect(valid).to.be.true;

        done();
      });
    });

    it('should return an error if the length is not ok', done => {
      checkPassword('notok', (err, valid) => {
        if (!err) return done('An error should have been returned');

        expect(err).to.be.an.instanceOf(LengthError);

        done();
      });
    });

    it('should return an error if it is too common', done => {
      checkPassword('password', (err, valid) => {
        if (!err) return done('An error should have been returned');

        expect(err).to.be.an.instanceOf(UniquenessError);

        done();
      });
    });

    it('should return an error if it is not random enough', done => {
      checkPassword('not random', (err, valid) => {
        if (!err) return done('An error should have been returned');

        expect(err).to.be.an.instanceOf(EntropyError);

        done();
      });
    });
  });

  describe('promise api', () => {
    it('should return true if the length is ok', done => {
      checkPassword('this is ok')
        .then(valid => {
          expect(valid).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should return true if it is unique', done => {
      checkPassword('this should not be a common password')
        .then(valid => {
          expect(valid).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should return true if it is pretty random', done => {
      checkPassword('th1s I5 A_Pre77yR@nd0mP2s5w0rd!')
        .then(valid => {
          expect(valid).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should return an error if the length is not ok', done => {
      checkPassword('notok')
        .then(() => done('An error should have been returned'))
        .catch(err => {
          expect(err).to.be.an.instanceOf(LengthError);

          done();
        });
    });

    it('should return an error if it is too common', done => {
      checkPassword('password')
        .then(() => done('An error should have been returned'))
        .catch(err => {
          expect(err).to.be.an.instanceOf(UniquenessError);

          done();
        });
    });

    it('should return an error if it is not random enough', done => {
      checkPassword('not random')
        .then(() => done('An error should have been returned'))
        .catch(err => {
          expect(err).to.be.an.instanceOf(EntropyError);

          done();
        });
    });
  });
});
