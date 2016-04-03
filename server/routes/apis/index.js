'use strict'
const express = require('express');
const router = express.Router();
const rp = require('request-promise');
module.exports = router;

router.post('/createNessieAccount', (req, res) => {
	console.log('req.body')
	if(!req.body.name){
		res.status(400).send({error: 'Your name is not valid.'})
		return;
	}
    const name = req.body.name.split(' ');
    const userData = {
        first_name: name[0] || 'Anon',
        last_name: name[1] || 'Anon',
        address: {
            street_number: '32',
            street_name: 'William Place',
            city: 'New York',
            state: 'NY',
            zip: '10004'
        }
    }

    const userAccountOptions = {
        method: 'POST',
        uri: 'http://api.reimaginebanking.com/customers',
        qs: {
            key: '9452e06cf1728189ae08d283b1aecc2f'
        },
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let createdUserAccountId;
    rp(userAccountOptions)
    .then( createdUserAccount => {
    	createdUserAccount = JSON.parse(createdUserAccount);
    	createdUserAccountId = createdUserAccount.objectCreated._id;
    	const moneyAccountData = {
    		type: "Checking",
    		nickname: "Primary",
    		rewards: 0,
    		balance: 10000
    	}
    	const moneyAccountOptions = {
    		method: 'POST',
    		uri: `http://api.reimaginebanking.com/customers/${createdUserAccountId}/accounts`,
    		qs: {
	            key: '9452e06cf1728189ae08d283b1aecc2f'
	        },
	        body: JSON.stringify(moneyAccountData),
	        headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	        }
    	}
    	return rp(moneyAccountOptions)
    })
    .then( createdMoneyAccount => {
		createdMoneyAccount = JSON.parse(createdMoneyAccount);
		res.status(200).send(
			{
				userId: createdUserAccountId,
				moneyAccountId: createdMoneyAccount.objectCreated._id
			}
		)
	})
	.catch( err => {
		console.error(err);
		res.status(500).send(err);
	})
})
