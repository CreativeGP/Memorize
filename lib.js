let _database = {};
let _mode = {};
let _settings = {};

if ('memorize_database' in localStorage) 
    _database = JSON.parse(localStorage['memorize_database']);

if ('memorize_mode' in localStorage) 
    _mode = JSON.parse(localStorage['memorize_mode']);

if ('memorize_settings' in localStorage) 
    _settings = JSON.parse(localStorage['memorize_settings']);

function configure(key, value) {
    _settings[key] = value;
    localStorage['memorize_settings'] = JSON.stringify(_settings);
}

function saveMode() {
    localStorage['memorize_mode'] = JSON.stringify(_mode);
}

function saveDB() {
    localStorage['memorize_database'] = JSON.stringify(_database);
}

/* -1 -- no database */
function appendRecord(dbname, record) {
    if (!(dbname in _database)) return -1;

    console.log('append record');
    console.log(record);

    _database[dbname].push(record);
    saveDB();

    return 0;
}


/* -1 -- no database */
function removeRecord(dbname, id) {
    if (!(dbname in _database)) return -1;

    console.log(`remove record id ${id}`);

    _database[dbname].splice(id, 1);
    saveDB();

    return 0;
}


/* -1 -- no database */
/* -2 -- no id */
function changeRecord(dbname, id, record) {
    if (!(dbname in _database)) return -1;
    if (id >= _database[dbname].length) return -2;

    console.log(`change record ${dbname} ${id} -> `);
    console.log(record);

    _database[dbname][id] = record;
    saveDB();

    return 0;
}

/* -1 -- such database exists. */
function newDB(dbname) {
    if (dbname in _database) return -1;

    console.log(`new database "${dbname}"!`);

    _database[dbname] = [];
    saveDB();

    return 0;
}

/* -1 -- such db doen't exists. */
function deleteDB(dbname) {
    if (!(dbname in _database)) return -1;

    console.log(`deleted database "${dbname}"!`);

    delete _database[dbname];
    saveDB();

    return 0;
}

/* -1 -- such db doen't exists. */
function backupDB(dbname) {
    if (!(dbname in _database)) return -1;
    
    console.log(`backuped database "${dbname}".`);

    let tmp = {};
    tmp[dbname] = _database[dbname];
    localStorage['memorize_tmp'] = JSON.stringify(tmp);

    return 0;
}

/* -1 -- such db doen't exists. */
/* -2 -- such db doen't backuped. */
function recoverDB(dbname) {
    if (!(dbname in _database)) return -1;

    let olddb = JSON.parse(localStorage['memorize_tmp']);
    if (!(dbname in olddb)) return -2;
    
    console.log(`recovered database "${dbname}".`);

    _database[dbname] = olddb[dbname];
    saveDB();

    return 0;
}


/* -1 -- such mode exists. */
function newMode(modename) {
    if (modename in _mode) return -1;

    console.log(`new mode "${modename}"!`);

    _mode[modename] = {
        mv: '',
        av: '',
        custom_js: `function updateMainView() {
  u('#main-text').text(word);
  u('#sub-text').text(subtext);
  u('#answer').text(answer);
}`,
        kbd_js: `switch (e.key) {
  case 'ArrowLeft':
    prevWord();
    break;
  case 'ArrowRight':
    nextWord();
    break;
  case 'Enter':
    nextWord();
    break;
  case ' ':
    toggleView();
    break;
}`,
    };
    saveMode();

    return 0;
}

/* -1 -- such mode doen't exists. */
function deleteMode(modename) {
    if (!(modename in _mode)) return -1;

    console.log(`deleted mode "${modename}"!`);

    delete _mode[modename];
    saveMode();

    return 0;
}

function renameMode(oldname, newname) {
    if (!(oldname in _mode) || newname in _mode) return -1;

    console.log(`rename mode "${oldname}" to "${newname}".`);

    _mode[newname] = _mode[oldname];
    delete _mode[oldname];
    
    saveMode();

    return 0;
}
