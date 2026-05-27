const express = require('express');
const cors = require('cors');

require('dotenv').config();

const logger = require('./middleware/logger');

const auditRoutes =
require('./routes/audit');

const leadRoutes =
require('./routes/leads');

const summaryRoutes =
require('./routes/summary');


const app =
express();


app.use(
cors({

origin:

process.env.CLIENT_URL ||

'http://localhost:3000'

})
);

app.use(
express.json()
);

app.use(
logger
);


/* Routes */

app.use(
'/api/audit',
auditRoutes
);

app.use(
'/api/leads',
leadRoutes
);

app.use(
'/api/summary',
summaryRoutes
);


app.get(

'/api/health',

(req,res)=>

res.json({

status:'ok'

})

);


const PORT =

process.env.PORT ||

5000;


app.listen(

PORT,

()=>console.log(

`Server running on port ${PORT}`

)

);