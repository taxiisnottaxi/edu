import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/edu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const advertSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    start_time: { type: Date, default: Date.now },
    create_time: { type: Date, default: Date.now },
    end_time: { type: Date, required: true },
    last_modified: { type: Date, default: Date.now }
})

// const Advert = mongoose.model('Advert', advertSchema)
// export default Advert

// Advert
//     .find()
//     .skip()
//     .limit(2)
//     .exec((err, result) => {
//         if (err) {
//             throw err
//         }
//         console.log(result)
//     })

export default mongoose.model('Advert', advertSchema)
