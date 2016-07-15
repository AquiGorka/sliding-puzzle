import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('./test/integration.json');
jasmine.execute();
