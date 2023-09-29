const express = require('express')
const bodyParser = require("body-parser");
const axios=require('axios')
const app = express()
const Doc =require('./doctype')
app.use(bodyParser.json());
app.use(express.static('public'))
const port = process.env.PORT ||1223
app.use(express.json());
const { Configuration, OpenAIApi } = require("openai");
app.use(express.urlencoded({ extended: false }));
// const uri = 'mongodb+srv://web1234:web1234@clusternewz.o2wezdx.mongodb.net/?retryWrites=true&w=majority';
const uri = 'mongodb+srv://sih2023:sih2023dsatm@cluster0.pdcoy7r.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    
    const db = mongoose.connection;
    // const collection = db.collection('drydatas');
    db.on('error', function(err){
        console.log(err);
      });

  })
  .catch((err) => {
    console.log(err);
  });

async function Docgpt(text) {  
  try{

    const options = {
      method: 'POST',
      url: 'https://chatgpt-api8.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
        'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
      },
      data: [
        {
          content: `You are an attorney working on a ${text} Document. Please provide a list of details in very simple words required from the user for this legal document in the format of a single js array only. For example, ['Tenant's Full Name', 'Landlord's Full Name', 'Property Address',... so on]. Ensure that you include all essential information in easy language for a comprehensive legal document.`,
          role: 'user'
        }
      ]
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
       return response.data
    } catch (error) {
        console.log(error)
       return "error"
    }
}catch(e){

}
}

// async function doc(txt){
  

   
// }

app.post('/docdetail', async(req, res) => {
    // let ans=await doc();
    console.log(req.body.d)
    var options = {
        method: 'GET',
        url: `https://39a4-35-240-205-82.ngrok.io/inputs/${req.body.d}`
      };
      
      axios.request(options).then(function (response) {
      
          res.send({"data":1,"res":response.data});
       
      }).catch(function (error) {
        console.error(error);
        res.send({"data":0});
      });



})

app.post('/detailinsert', async(req, res) => {
   

for (const key in req.body.data) {
  if (req.body.data.hasOwnProperty(key)) {
    console.log(`Key: ${key}, Value: ${req.body.data[key]}`);
  }
}
console.log(req.body.dat)
console.log(req.body.type)
const requestData = {
  doc_name: req.body.type,
  user_details:JSON.stringify(req.body.dat)
};

// Make a POST request using Axios
axios.post('https://39a4-35-240-205-82.ngrok.io/generate/', requestData)
  .then((response) => {
    console.log('Request successful', response.data);
    res.send({"data":1,"res":response.data});
  })
  .catch((error) => {
    console.error('Error:', error);
    res.send({"data":0});
  });
    // console.log(typeof req.body)

})



app.post('/doctype', async(req, res) => {

    
    try {
        const item = await Doc.find({user_id:req.body.Sender});
        if (!item) {
          res.send({"data":0});
        } else {
          res.send({"data":1,"res":item});
        }
      } catch (err) {
        console.log(err);
        res.send({"data":99});
      }

})

app.listen(port, () => {
    console.log('Server started on post ' + port)
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/backend/index.html');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/public/backend/index.html');
});

app.get('/page-alexa', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-alexa.html');
});
app.get('/page-android', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-android.html');
});

app.get('/page-brightspot', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-brightspot.html');
});

app.get('/page-delete', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-delete.html');
});

app.get('/page-favourite', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-favourite.html');
});

app.get('/page-files', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-files.html');
});

app.get('/page-folders', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-folders.html');
});

app.get('/page-ionic', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-ionic.html');
});

app.get('/page-viewfile', (req, res) => {
  res.sendFile(__dirname + '/public/backend/page-viewfile.html');
});

app.get('/pages-blank-page', (req, res) => {
  res.sendFile(__dirname + '/public/backend/pages-blank-page.html');
});

app.get('/pages-comingsoon', (req, res) => {
  res.sendFile(__dirname + '/public/backend/pages-comingsoon.html');
});

app.get('/pages-error-500', (req, res) => {
  res.sendFile(__dirname + '/public/backend/pages-error-500.html');
});

app.get('/pages-error', (req, res) => {
  res.sendFile(__dirname + '/public/backend/pages-error.html');
});

app.get('/pages-maintenance', (req, res) => {
  res.sendFile(__dirname + '/public/backend/pages-maintenance.html');
});

app.get('/docg', (req, res) => {
  res.sendFile(__dirname + `/public/backend/docgeneration.html`);
});
app.get('/docresult', (req, res) => {
  res.sendFile(__dirname + `/public/backend/docresult.html`);
});
// app.listen(port, () => {
//     console.log('Server started on post ' + port)
// })