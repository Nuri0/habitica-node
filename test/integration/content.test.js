import Habitica from '../../src/index';

describe('Content', () => {
  let api = new Habitica({
    endpoint: `localhost:${process.env.PORT}/api/v2`,
  });

  describe('#get', () => {
    it('gets all content if no argument is provided', (done) => {
      api.content.get()
        .then((res) => {
          expect(res.eggs).to.exist;
          expect(res.quests).to.exist;
          expect(res.gear).to.exist;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('gets specific piece of content if valid argument is provided', (done) => {
      api.content.get('eggs')
        .then((res) => {
          expect(res.Wolf).to.exist;
          expect(res.Whale).to.exist;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('gets specific piece of content file with nested argument', (done) => {
      api.content.get('gear.tree.weapon.warrior')
        .then((res) => {
          expect(res['0']).to.exist;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('throws error if an invalid argument is provided', (done) => {
      api.content.get('invalid-content-path')
        .then((res) => {
          done('Fail: Did not throw an error');
        })
        .catch((err) => {
          expect(err).to.eql('invalid-content-path is not a valid content path');
          done();
        });
    });
  });

  describe('#getKeys', () => {
    it('gets top level keys of content object', (done) => {
      api.content.getKeys()
        .then((res) => {
          expect(res).to.contain('eggs');
          expect(res).to.contain('quests');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('gets keys of a specific piece of content', (done) => {
      api.content.getKeys('eggs')
        .then((res) => {
          expect(res).to.contain('Wolf');
          expect(res).to.contain('Whale');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('gets keys of specific piece of content file with nested argument', (done) => {
      api.content.getKeys('gear.tree.weapon.warrior')
        .then((res) => {
          expect(res).to.contain('0');
          expect(res).to.contain('1');
          expect(res).to.contain('2');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('throws error if an invalid argument is provided', (done) => {
      api.content.getKeys('invalid-content-path')
        .then((res) => {
          done('Fail: Did not throw an error');
        })
        .catch((err) => {
          expect(err).to.eql('invalid-content-path is not a valid content path');
          done();
        });
    });
  });

  describe('#getUserPaths', () => {
    it('gets user paths', (done) => {
      api.content.getUserPaths()
        .then((res) => {
          expect(res._id).to.exist;
          expect(res.apiToken).to.exist;
          expect(res['contributor.level']).to.exist;
          expect(res['items.gear.owned.weapon_warrior_0']).to.exist;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
