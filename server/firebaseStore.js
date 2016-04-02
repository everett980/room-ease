'use strict'
const Firebase = require('firebase');
const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');
const firebaseRoomsRef = new Firebase('https://room-ease.firebaseio.com/rooms');
const rp = require('request-promise');

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
    }
}

// functions.createATask(0, {frequency: 4, name: 'Do everett' })
// functions.reassignATask(0, 1, 0) //should reassign task #1 (0-based) to user #0 in room #0


module.exports = functions;


