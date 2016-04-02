'use strict'

const Firebase = require('firebase');
const moment = require('moment')


const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

return firebaseRef.set({
	room: [
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
				    isAdmin: true
			    },
			    {
				    id: 1,
				    email: 'yustynn0@gmail.com',
				    profilePicture: 'https://www.fillmurray.com/140/100',
				    name: 'Yustynn Panicker',
				    baseRentOwed: 1000,
				    rentOwedThisMonth: 1000,
				    isAdmin: false
			    },
			    {
				    id: 2,
				    email: 'ldthorne96@gmail.com',
				    profilePicture: 'https://www.fillmurray.com/140/100',
				    name: 'Daniel Thorne',
				    baseRentOwed: 1000,
				    rentOwedThisMonth: 1000,
				    isAdmin: false
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
				    isAdmin: true
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
.then( res => {
	console.log('Seeded successfully');
	throw new Error('there wasn\'t actually an error. sorry mom');
})
.catch( err => {
	throw new Error(err)
})