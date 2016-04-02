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
let user1NessieId;
let user2NessieId;
let user0Room1NessieId;

// rp(user0Options)
Promise.resolve(user0Options)
.then( res => {
	// const createdUser0 = JSON.parse(res);
	// user0NessieId = createdUser0.objectCreated._id
	user0NessieId = 'abc123'
	// return rp(user1Options)
	return user0NessieId;
})
.then( res => {
	// const createdUser1 = JSON.parse(res);
	// user1NessieId = createdUser1.objectCreated._id
	user1NessieId = '321cba'
	// return rp(user2Options)
	return user1NessieId;
})
.then( res => {
	// const createdUser2 = JSON.parse(res);
	// user2NessieId = createdUser2.objectCreated._id
	user2NessieId = 'blahblah'
	// return rp(user0Room1Options)
	return user2NessieId;
})
.then( res => {
	// const createdUser0Room1 = JSON.parse(res);
	// user0Room1NessieId = createdUser0Room1.objectCreated._id
	user0Room1NessieId = 'pleasework.jpg';
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
					    nessieId: user0NessieId
				    },
				    {
					    id: 1,
					    email: 'yustynn@gmail.com',
					    profilePicture: 'https://www.fillmurray.com/140/100',
					    name: 'Yustynn Panicker',
					    baseRentOwed: 1000,
					    rentOwedThisMonth: 1000,
					    isAdmin: false,
					    nessieId: user1NessieId
				    },
				    {
					    id: 2,
					    email: 'ldthorne96@gmail.com',
					    profilePicture: 'https://www.fillmurray.com/140/100',
					    name: 'Daniel Thorne',
					    baseRentOwed: 1000,
					    rentOwedThisMonth: 1000,
					    isAdmin: false,
					    nessieId: user2NessieId
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
				thisMonthsTasks: [
				    {
			            id: 0,
			            name: 'Take out the trash',
			            startDate: moment().toString(),
			            dueDate: moment().add({days: 7}).toString(),
			            assignedTo: 0
			        },
			        {
			            id: 1,
			            name: 'Do the dishes',
		                startDate: moment().toString(),
			            dueDate: moment().add({days: 30/8}).toString(),
			            assignedTo: 2
			        },
			        {
			            id: 2,
			            name: 'Clean Yustynn',
		                startDate: moment().toString(),
			            dueDate: moment().add({days: 30/2}).toString(),
			            assignedTo: 1
			        }
			    ],
			    proposedTrades: [
			        {
			            requester: 0,
			            responder: 1,
			            tasksForRequester: [2],
			            tasksForResponder: [0],
			            moneyForRequester: 8
			        }
			    ],
			    communalPurchases: [
			        {
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
					    nessieId: user0Room1NessieId
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
				thisMonthsTasks: [
					{
			            id: 0,
			            name: 'Take out the trash',
			            startDate: moment().toString(),
			            dueDate: moment().add({days: 7}).toString(),
			            assignedTo: 0
			        },
			        {
			            id: 1,
			            name: 'Do the dishes',
			            startDate: moment().toString(),
			            dueDate: moment().add({days: 7}).toString(),
			            assignedTo: 1
			        },
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