'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 1337;
const routes = require('./routes/index.js');
const schedule = require('node-schedule');
const Firebase = require('firebase');
const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');
const rp = require('request-promise');
const moment = require('moment');
const _ = require('lodash');

module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here.


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes)

interpolateTasks();

function interpolateTasks() {
    const options = {
        uri: 'https://room-ease.firebaseio.com/rooms.json'
    }
    rp(options)
    .then(res => {
        const rooms = JSON.parse(res);
        rooms.forEach(room => {
            let dueDate = room.dueDate.toString();
            dueDate = moment(dueDate, 'ddd, MMM DD YYYY HH:mm:ss ZZ').format('MM/DD/YYYY');
            //we made today the due date for testing porpoises 
            //(http://idontseatheporpoiseinthis.weebly.com/uploads/2/6/0/1/26012442/136029_orig.jpg)
            //today should be moment().format('MM/DD/YYYY')
            const today = moment().add({ months: 1 }).format('MM/DD/YYYY');
            if (today === dueDate) {
                const monthFromToday = new Date(moment().add({ months: 1 }).format('MM/DD/YYYY')).getTime();
                const betterToday = new Date(moment().format('MM/DD/YYYY')).getTime();
                const millis = monthFromToday - betterToday;
                const numRoommates = room.members.length;
                const generatedTaskList = [];
                const shuffledPeoples = _.shuffle(room.members);
                room.monthlyTasks.forEach((task) => {
                    const interval = millis / task.frequency;
                    for (let i = 0; i < task.frequency; i++) {
                        generatedTaskList.push({
                            id: generatedTaskList.length,
                            name: task.name,
                            startDate: new Date(betterToday + (i * interval)),
                            endDate: new Date(betterToday + ((i + 1) * interval)),
                            assignedTo: shuffledPeoples[generatedTaskList.length % shuffledPeoples.length].id
                        })
                    }
                })

                rooms[room.roomId].thisMonthsTasks = generatedTaskList;
            	const transfersFrom = [];
            	let nessieIdToTransferTo;
                room.members.forEach( member => {
                	if(!member.isAdmin && member.nessieId){
                		transfersFrom.push(
                			{
                				nessieId: member.nessieId,
                				amount: member.rentOwedThisMonth
                			}
                		)
                	} else if(member.isAdmin){
                		nessieIdToTransferTo = member.nessieId;
                	}
                })
                transfersFrom.forEach( transferData => {
                	console.log(transferData)
                	// const options = {

                	// }
                })
            }
        })
        return firebaseRef.update({ rooms })
    })
    .catch(err => {
        console.error(err)
    })
}
// const job = schedule.scheduleJob('0 0 * * * *', function() {
// 	interpolateTasks();
// });



app.listen(PORT, () => {
    console.log(`listening diligently on port ${PORT}`)
})
