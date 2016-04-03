'use strict'

const Firebase = require('firebase');
const moment = require('moment');
const rp = require('request-promise')
const Promise = require('bluebird')


const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

const user0 = {
	first_name: 'Everett',
	last_name: 'Ross',
	address: 
	{
		street_number: '32',
		street_name: 'William Place',
		city: 'New York',
		state: 'NY',
		zip: '10004'
	}
}

const user1 = {
	first_name: 'Yustynn',
	last_name: 'Panicker',
	address: 
	{
		street_number: '99',
		street_name: 'Riley Road',
		city: 'New York',
		state: 'NY',
		zip: '11216'
	}
}

const user2 = {
	first_name: 'Leon',
	last_name: 'Thorne',
	address: 
	{
		street_number: '1162',
		street_name: 'Pacific Street',
		city: 'New York',
		state: 'NY',
		zip: '11216'
	}
}

const user0Room1 = {
	first_name: 'Charlie',
	last_name: 'Chaplin',
	address: 
	{
		street_number: '1234',
		street_name: 'Redeye Road',
		city: 'Chad',
		state: 'MA',
		zip: '02476'
	}
}

const user0Options = {
	method: 'POST',
	uri: 'http://api.reimaginebanking.com/customers',
	qs: {
		key: '9452e06cf1728189ae08d283b1aecc2f'
	},
	body: JSON.stringify(user0),
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
}

const user1Options = {
	method: 'POST',
	uri: 'http://api.reimaginebanking.com/customers',
	qs: {
		key: '9452e06cf1728189ae08d283b1aecc2f'
	},
	body: JSON.stringify(user1),
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
}

const user2Options = {
	method: 'POST',
	uri: 'http://api.reimaginebanking.com/customers',
	qs: {
		key: '9452e06cf1728189ae08d283b1aecc2f'
	},
	body: JSON.stringify(user2),
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
}

const user0Room1Options = {
	method: 'POST',
	uri: 'http://api.reimaginebanking.com/customers',
	qs: {
		key: '9452e06cf1728189ae08d283b1aecc2f'
	},
	body: JSON.stringify(user0Room1),
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
}

let user0NessieId;
let user0NessieAccountId;
let user1NessieId;
let user1NessieAccountId;
let user2NessieId;
let user2NessieAccountId;
let user0Room1NessieId;
let user0Room1NessieAccountId;

rp(user0Options)
// Promise.resolve(user0Options)
.then( res => {
	const createdUser0 = JSON.parse(res);
	user0NessieId = createdUser0.objectCreated._id
	const moneyAccountData = {
		type: "Checking",
		nickname: "Primary",
		rewards: 0,
		balance: 10000
	}
	const moneyAccountOptions = {
		method: 'POST',
		uri: `http://api.reimaginebanking.com/customers/${user0NessieId}/accounts`,
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
}).then( res => {
	res = JSON.parse(res);
	user0NessieAccountId = res.objectCreated._id;
	return rp(user1Options)
})
.then( res => {
	const createdUser1 = JSON.parse(res);
	user1NessieId = createdUser1.objectCreated._id
	const moneyAccountData = {
		type: "Checking",
		nickname: "Primary",
		rewards: 0,
		balance: 10000
	}
	const moneyAccountOptions = {
		method: 'POST',
		uri: `http://api.reimaginebanking.com/customers/${user1NessieId}/accounts`,
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
.then( res => {
	res = JSON.parse(res);
	user1NessieAccountId = res.objectCreated._id;
	return rp(user2Options);
})
.then( res => {
	const createdUser2 = JSON.parse(res);
	user2NessieId = createdUser2.objectCreated._id
	const moneyAccountData = {
		type: "Checking",
		nickname: "Primary",
		rewards: 0,
		balance: 10000
	}
	const moneyAccountOptions = {
		method: 'POST',
		uri: `http://api.reimaginebanking.com/customers/${user2NessieId}/accounts`,
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
.then( res => {
	res = JSON.parse(res);
	user2NessieAccountId = res.objectCreated._id;
	return rp(user0Room1Options)
})
.then( res => {
	const createdUser0Room1 = JSON.parse(res);
	user0Room1NessieId = createdUser0Room1.objectCreated._id
	const moneyAccountData = {
		type: "Checking",
		nickname: "Primary",
		rewards: 0,
		balance: 10000
	}
	const moneyAccountOptions = {
		method: 'POST',
		uri: `http://api.reimaginebanking.com/customers/${user0Room1NessieId}/accounts`,
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
.then( res => {
	res = JSON.parse(res);
	user0Room1NessieAccountId = res.objectCreated._id;
	return insertIntoFirebase()
})
.then( () => {
	console.log('Seeded successfully');
	throw new Error('there wasn\'t actually an error. sorry mom');
})
.catch(function(err){
	console.error(err)
})

function insertIntoFirebase(){
	return firebaseRef.set({
		rooms: [
			{
				roomId: 0,
				members: [
				    {
					    id: 0,
					    email: 'everett980@gmail.com',
					    profilePicture: 'https://www.fillmurray.com/140/100',
					    name: 'Everett Ross',
					    baseRentOwed: 1000,
					    rentOwedThisMonth: 1000,
					    isAdmin: true,
					    nessieId: user0NessieId,
					    nessieCheckingId: user0NessieAccountId
				    },
				    {
					    id: 1,
					    email: 'yustynn@gmail.com',
					    profilePicture: 'https://www.fillmurray.com/140/100',
					    name: 'Yustynn Panicker',
					    baseRentOwed: 1000,
					    rentOwedThisMonth: 1000,
					    isAdmin: false,
					    nessieId: user1NessieId,
					    nessieCheckingId: user1NessieAccountId

				    },
				    {
					    id: 2,
					    email: 'ldthorne96@gmail.com',
					    profilePicture: 'https://www.fillmurray.com/140/100',
					    name: 'Daniel Thorne',
					    baseRentOwed: 1000,
					    rentOwedThisMonth: 1000,
					    isAdmin: false,
					    nessieId: user2NessieId,
					    nessieCheckingId: user2NessieAccountId
				    }
				],
				monthlyTasks: [
				    {
				        id: 0,
				        name: 'Take out trash',
				        frequency: 4 //in number of times/month 
				    },
				    {
				        id: 1,
				        name: 'Do the dishes',
				        frequency: 8 //in number of times/month 
				    },
				    {
				        id: 2,
				        name: 'Clean Yustynn',
				        frequency: 2 //in number of times/month 
				    }
				],
			    proposedTrades: [
			        {
			        	id: 0,
			            initiator: 0,
			            recipient: 1,
			            tasksForInitiator: [2], //tasks for initiator if the trade is accepted
			            tasksForRecipient: [0], //tasks for recipient if the trade is accepted
			            rentIncreaseForInitiator: 8 //money will be added to initiator's rent due and subtracted from recipient's 
			        }
			    ],
			    communalPurchases: [
			        {	
			        	id: 0,
		    	        item: 'toilet paper',
		    	        price: 5,
		    	        contestors: [0],
		    	        purchaser: 2,
		    	        date: moment().subtract({days: 2}).toString()
			        }
			    ],
				totalBaseRent: 3000,
				dueDate: moment().add({months: 1}).toString(), 

			},

			{
				roomId: 1,
				members: [
					{
						id: 0,
					    email: 'charlie@gmail.com',
					    profilePicture: 'https://www.fillmurray.com/140/100',
					    name: 'Charlie Chaplin',
					    baseRentOwed: 500,
					    rentOwedThisMonth: 500,
					    isAdmin: true,
					    nessieId: user0Room1NessieId,
					    nessieCheckingId: user0Room1NessieAccountId
					},
					{
						id: 1,
						name: 'Jai Ho',
					    baseRentOwed: 500,
					    rentOwedThisMonth: 500,
					    isAdmin: false
					},
				],
				monthlyTasks: [
					{
				        id: 0,
				        name: 'Take out trash',
				        frequency: 4 //in number of times/month 
				    },
				    {
				        id: 0,
				        name: 'Do the dishes',
				        frequency: 4 //in number of times/month 
				    }
				],
				proposedTrades: [],
				communalPurchases: [],
				totalBaseRent: 1000,
				dueDate: moment().add({months: 1}).toString()

			}
		],
		invites: {
		    '011234': {
		        roomId: 1,
		        name: 'Jai Ho',
		        rentDue: 500
		    },
		},
		googleIds: {
		    everett980: 0,
		    yustynn: 0,
		    ldthorne96: 0,
		    charlie: 1
		}
	})
}