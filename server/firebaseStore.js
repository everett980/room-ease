'use strict'

const Firebase = require('firebase');
const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');
const firebaseRoomsRef = new Firebase('https://room-ease.firebaseio.com/rooms');
const rp = require('request-promise');
const moment = require('moment')

const functions = {
    getAllData() {
        const options = {
            uri: 'https://room-ease.firebaseio.com/.json'
        }
        return rp(options)
    },
    getAllRooms() {
    	const options = {
            uri: 'https://room-ease.firebaseio.com/rooms.json'
        }
        return rp(options)
    },
    getAllGoogleIds() {
    	const options = {
            uri: 'https://room-ease.firebaseio.com/googleIds.json'
        }
        return rp(options)
    },
    getAllOutstandingInvites(){
    	const options = {
            uri: 'https://room-ease.firebaseio.com/invites.json'
        }
        return rp(options)
    },
    getARoom(roomIndex){
    	const options = {
            uri: `https://room-ease.firebaseio.com/rooms/${roomIndex}.json`
        }
        return rp(options)
    },
    getARoomsMembers(roomIndex){
    	console.log('being called')
    	return this.getARoom(roomIndex)
    	.then( room => {
    		room = JSON.parse(room);
    		return room.members;
    	})
    },
    getARoomsTasks(roomIndex){
    	return this.getARoom(roomIndex)
    	.then( room => {
    		room = JSON.parse(room);
    		return room.monthlyTasks;
    	})
    },
    getARoomsCurrentMonthTasks(roomIndex){
    	return this.getARoom(roomIndex)
    	.then( room => {
    		room = JSON.parse(room);
    		return room.thisMonthsTasks;
    	})
    },
    getARoomsCommunalPurchases(roomIndex){
    	return this.getARoom(roomIndex)
    	.then( room => {
    		room = JSON.parse(room);
    		return room.communalPurchases;
    	})
    },
    getTradeProposals(roomIndex){
    	this.getARoom(roomIndex)
    	return this.getARoom(roomIndex)
    	.then( room => {
    		room = JSON.parse(room);
    		return room.proposedTrades ? room.proposedTrades : [];
    	})
    },
    createATask(roomIndex, taskData){
    	this.getARoomsTasks(roomIndex)
    	.then( tasks => {
    		taskData.id = tasks.length;
    		tasks.push(taskData);
    		const monthlyTasksFirebaseRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomIndex}/monthlyTasks`);
    		return monthlyTasksFirebaseRef.set(tasks)
    	})
    },
    reassignATask(roomIndex, taskId, userId){
    	this.getARoomsCurrentMonthTasks(roomIndex)
    	.then( tasks => {
    		tasks[taskId].assignedTo = userId;
    		const thisMonthsTasksFirebaseRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomIndex}/thisMonthsTasks`);
    		return thisMonthsTasksFirebaseRef.set(tasks)
    	})
    },
    createARoom (data){
    	//monthly tasks
    	//all the people
    		//only complete user will be admin
    		//email and rent for everyone else
    	//dueDate
    	this.getAllRooms()
    	.then( rooms => {
    		let allRooms = JSON.parse(rooms);
    		let allRoomsLength = Object.keys(allRooms).length;
    		const newRoom = {
    			roomId: allRoomsLength,
    		}
    		allRooms[allRoomsLength] = newRoom;
    		return firebaseRoomsRef.set(allRooms)
    	})
    },
    createInvites(){

    },
    addCommunalPurchase(roomIndex, itemDetails){
    	this.getARoomsCommunalPurchases(roomIndex)
    	.then( communalPurchases => {
    		const purchase = {
    			contestors: [],
    			date: itemDetails.date,
    			item: itemDetails.name,
    			price: itemDetails.price,
    			purchaser: itemDetails.purchaser
    		}
    		console.log(purchase)
    		communalPurchases[communalPurchases.length] = purchase;
    		console.log(communalPurchases)
    		const communalPurchasesFirebaseRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomIndex}/communalPurchases`);
    		return communalPurchasesFirebaseRef.set(communalPurchases)
    	})
    },
    createATradeProposal(roomIndex, initiatorId, recipientId, tasksForInitiator, tasksForRecipient, rentIncreaseForInitiator){
    	this.getTradeProposals(roomIndex)
    	.then( proposals => {
    		const proposalData = {
    			roomId: roomIndex,
    			rentIncreaseForInitiator: rentIncreaseForInitiator || 0,
    			initiator: initiatorId,
    			recipient: recipientId,
    			tasksForInitiator: tasksForInitiator || [],
    			tasksForRecipient: tasksForRecipient || []
    		}
    		proposals[proposals.length] = proposalData;
    		const proposedTradesFirebaseRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomIndex}/proposedTrades`);
    		return proposedTradesFirebaseRef.set(proposals)
    	})
    },
    removeATrade(roomIndex, tradeId){
    	const proposedTradesFirebaseRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomIndex}/proposedTrades/${tradeId}`);
    	return proposedTradesFirebaseRef.remove()
    },
    acceptATrade(roomIndex, tradeId){
    	this.getTradeProposals(roomIndex)
    	.then( proposals => {
    		const proposal = proposals[tradeId]
    		if(proposal.tasksForInitiator && proposal.tasksForInitiator.length){
    			proposal.tasksForInitiator.forEach( proposedTask => {
    				this.reassignATask(roomIndex, proposedTask, proposal.initiator)
    			})
    		}
    		if(proposal.tasksForRecipient && proposal.tasksForRecipient.length){
    			proposal.tasksForRecipient.forEach( proposedTask => {
    				this.reassignATask(roomIndex, proposedTask, proposal.recipient)
    			})
    		} 
    		if(proposal.rentIncreaseForInitiator){
    			this.getARoomsMembers(roomIndex)
    			.then( members => {
    				const recipient = members[proposal.recipient];
    				const initiator = members[proposal.initiator];
    				initiator.rentOwedThisMonth += proposal.rentIncreaseForInitiator;
    				recipient.rentOwedThisMonth -= proposal.rentIncreaseForInitiator;
    				members[proposal.recipient] = recipient;
    				members[proposal.initiator] = initiator;
    				const acceptATradeFirebaseRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomIndex}/members`);
    				return acceptATradeFirebaseRef.set(members)
    			})
			}
			this.removeATrade(roomIndex, tradeId)
    	})
    }
}

// functions.createATradeProposal(0, 0, 1, [], [2], 2);

// functions.acceptATrade(0, 1)
// itemDetails <-- name, price, id of purchaser, date
// const item = {
// 	date: moment().subtract({days:2}).toString(),
//     name: 'Windex',
//     price: 4,
// 	purchaser: 0
// }
// functions.addCommunalPurchase(0, item)
//createInvites <-- called by createARoom
//joinARoom(roomId, inviteCode, email)
//

// functions.createATask(0, {frequency: 4, name: 'Do everett' })
// functions.reassignATask(0, 1, 0) //should reassign task #1 (0-based) to user #0 in room #0
// functions.createATradeProposal(0)

module.exports = functions;


