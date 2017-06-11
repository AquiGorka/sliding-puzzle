import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('./test/all.json');
jasmine.execute();
