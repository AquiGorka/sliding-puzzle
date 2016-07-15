import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('./test/unit.json');
jasmine.execute();
