var mysql = require("mysql");
var inquirer = require("inquirer");

const userChoice = [
    'Which songs from a particular artist are in the top5000 list',
    'Which artists appear in the top5000 list more than once',
    'What are songs in the top5000 from the 80s',
    'Pick a song, and retrieve only its information based on title'
]

const singer ='';

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'Yuel04Banh08',
    database: 'top_songsDB'
});

function connect () {
    return new Promise (function (resolve){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("connected as id " + connection.threadId + "\n");
            resolve();
        })
    }) 
};


async function init () {
    try {
        await connect ();
        let resOne = await firstQuestion();
        switch (resOne.userChoice) {
            case 'Which songs from a particular artist are in the top5000 list':
                return searchSongbyArtist();
            case 'Which artists appear in the top5000 list more than once':
                return searchNumSongsbyArtist();
            case 'What are songs in the top5000 from the 80s':
                return searchEighty();
            case 'Pick a song, and retrieve only its information based on title':
                break;
            default:
                console.log('you must select a option!')
                init();
        };
        
    } catch (err) {
        console.log (err);
    }
};

function firstQuestion(){
    console.log('welcome to top songs 5000');
    return inquirer.prompt ([
        {type: 'list',
        name: 'userChoice',
        message: 'How would you like to search?',
        choices: userChoice,
        validate: answer =>{
            if (answer.length !== 1) {
                console.log('You must to select only one option');
                return false;
            } else {
                return true;
                }
        }
    }]);
};

function searchEighty() {
    console.log("Selecting all music in the 1980's...\n");
    connection.query("SELECT * FROM top5000 WHERE year BETWEEN 1980 and 1989", function (err, res){
        console.table(res);
        connection.end();
    })
};

// function searchNumSongsbyArtist() {
//     console.log("Selecting all artists appear in the top5000 list more than once\n");
//     connection.query("SELECT artist, COUNT(*)>1 FROM top5000 GROUP BY artist HAVING COUNT(*)>1"), function (err, res){
//         console.table(res);
//         connection.end();
//     })
// };


async function searchSongbyArtist() {
    try{
        let ansOne = await inquirer.prompt ([
            {type: 'input',
            name: 'singer',
            message: 'Who would you like to search?'
            }]);
        console.log("Selecting all"+ ansOne.singer +"music...\n");
        connection.query("SELECT song FROM top5000 WHERE artist= "+"'"+ansOne.singer.toString()+"'", function (err, res){
        console.table(res);
        connection.end();
        });
    }
    catch(err) {
        console.log (err);
    
    }
}

async function searchSongbyArtist() {
    try{
        let ansOne = await inquirer.prompt ([
            {type: 'input',
            name: 'singer',
            message: 'Who would you like to search?'
            }]);
        console.log("Selecting all "+ ansOne.singer +"music...\n");
        connection.query("SELECT song FROM top5000 WHERE artist= "+"'"+ansOne.singer.toString()+"'", function (err, res){
        console.table(res);
        connection.end();
        });
    }
    catch(err) {
        console.log (err);
    
    }
}

init();
