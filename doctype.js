const mongoose =require("mongoose") 
const { Bool } = require("mongoose/lib/schema/index")

const docschema =mongoose.Schema({
type_id:{
type: String,
required: true,
trim: true,
},   

name: {
type: String,
required: true,
trim: true,
}

})
const docModel = mongoose.model("doctype",docschema)
module. exports= docModel