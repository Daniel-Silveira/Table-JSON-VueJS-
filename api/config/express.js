const morgan = require('morgan'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    cors = require('cors'),
    fs = require('fs'),
    router = express.Router();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

class ConfigController {

    constructor() {
        this.filePath = 'config/config.json';
        this.readConfigFile = this.readConfigFile.bind(this);
        this.writeConfigFile = this.writeConfigFile.bind(this);
    }

    readConfigFile(req, res) {

        fs.readFile(this.filePath, (err, data) => {

            if (err) {
                console.log(err);
                res.status(500).json({ msg: 'Reading failed' });
            }

            const config = JSON.parse(data.toString());

            res.json(config);

        });

    }

    writeConfigFile(req, res) {

        const data = req.body;

        fs.writeFile(this.filePath, JSON.stringify(data, null, 4), (err) => {

            if (err) {
                res.status(500).json({ msg: 'Writing failed' });
            }

            res.status(201).json(data);
        })

    }

}

class Table2Controller {

    constructor() {
        this.filePath = 'config/table2.json';
        this.readConfigFile = this.readConfigFile.bind(this); 
        this.writeConfigFile = this.writeConfigFile.bind(this); 

    }
    readConfigFile(req, res) {
        
        fs.readFile(this.filePath, (err, data) => {

            if (err) {
                console.log(err);
                res.status(500).json({ msg: 'Reading failed' });
            }

            const config = JSON.parse(data.toString());

            res.json(config);

        });

    }

    writeConfigFile(req, res) {

        const data = req.body;

        fs.writeFile(this.filePath, JSON.stringify(data), (err) => {

            if (err) {
                res.status(500).json({ msg: 'Writing failed' });
            }

            res.status(201).json(data);
        })

    }
 
}

class Table3Controller {

    constructor() {
        this.filePath = 'config/table3.json';
        this.readConfigFile = this.readConfigFile.bind(this); 
        this.writeConfigFile = this.writeConfigFile.bind(this); 

    }
    readConfigFile(req, res) {
        
        fs.readFile(this.filePath, (err, data) => {

            if (err) {
                console.log(err);
                res.status(500).json({ msg: 'Reading failed' });
            }

            const config = JSON.parse(data.toString());

            res.json(config);

        });

    }

    writeConfigFile(req, res) {

        const data = req.body;

        fs.writeFile(this.filePath, JSON.stringify(data), (err) => {

            if (err) {
                res.status(500).json({ msg: 'Writing failed' });
            }

            res.status(201).json(data);
        })

    }
 
}

const configController = new ConfigController();
const table2Controller = new Table2Controller();
const table3Controller = new Table3Controller();

router.route('/config')
    .get(configController.readConfigFile)
    .post(configController.writeConfigFile);


router.route('/table2')
    .get(table2Controller.readConfigFile)
    .post(table2Controller.writeConfigFile);

router.route('/table3')
    .get(table3Controller.readConfigFile)
    .post(table3Controller.writeConfigFile);


app.use('/api/v1', router);

module.exports = app;