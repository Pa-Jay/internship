const router = require('express').Router();
const request = require('request');
const _ = require('lodash');
const path = require('path');

const {Donor} = require('../../Models/Payment')
const {initializePayment, verifyPayment} = require('../../configs/paystack')(request);

router.get('/',(req, res) => {
    // res.render('index.pug');
    return res.status(200).json({message:"please fill in the details to make transaction"})
});
///////
const paystack = (request) => {
    const MySecretKey = 'Bearer sk_test_f41c902e0875807ec12d3436f5810aed4c76d089';
    //replace the secret key with that from your paystack account
    const initializePayment = (form, mycallback) => {
        const options = {
            url : 'https://api.paystack.co/transaction/initialize',
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            },
            form
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request.post(options, callback)
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }

    return {initializePayment, verifyPayment};
}

// module.exports = paystack;


//////
router.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return res.redirect('/error')
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data)
        // res.redirect(response.data.authorization_url)
    });
});

router.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);         
        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);

        [reference, amount, email, full_name] =  data;
        
        newDonor = {reference, amount, email, full_name}

        const donor = new Donor(newDonor)

        donor.save().then((donor)=>{
            if(!donor){
                return res.redirect('/error');
            }
            res.redirect('/receipt/'+donor._id);
        }).catch((e)=>{
            res.redirect('/error');
        })
    })
});

router.get('/receipt/:id', (req, res)=>{
    const id = req.params.id;
    Donor.findById(id).then((donor)=>{
        if(!donor){
            //handle error when the donor is not found
            res.redirect('/error')
        }
        return res.status(200).json({message:"transaction successful", donor})

    }).catch((e)=>{
        res.redirect('/error')
    })
})

router.get('/error', (req, res)=>{
    return res.status(400).json({message:"error in transaction, transaction unsuccessful"})

})

module.exports = router
