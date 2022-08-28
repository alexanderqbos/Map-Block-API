import mongoose from 'mongoose';

const messageModel = mongoose.model('message');

// var messages = [
//     { id: 1, name: "Bill", msgText: "Test" },
//     { id: 2, name: "Bill", msgText: "TEST!@!!@" },
//     { id: 3, name: "Bill", msgText: "TEST1234" },
//     { id: 4, name: "Bill", msgText: "testing" },
//     { id: 5, name: "Jared", msgText: "IT'S WORKING BILL!" },
//     { id: 6, name: "Bill", msgText: "Test" },
//   ];

const getAllMessages = async (req, res) => {
    try {
        let messages = await messageModel.find({}, '', { sort: { _id: -1 } }
        ).exec();
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
};

const addNewMessage = async (req, res) => {
    // res.status(200).send('Successful API POST Request');
    try {
        // let message = await messageSchema.validate(req.body);
        // message.id = messages.length;
        // messages.unshift(message);
        // console.info(messages);
        let message = await messageModel.create(req.body);
        res.status(201)
            .json(message);
    } catch (err) {
        res.status(400)
            .send('Bad Request. The message in the boddy of the\nRequest is either missing or malformed.')
    }
};

const UpdateMessage = async (req, res) => {
    try {
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message) {
            // there wasn't an error, but the message wasn't found
            // i.e. the id given doesn't match any in the database
            res.sendStatus(404);
        } else {
            // message found - is the user authorized?
            if (message.name === req.user.username) {
                // auth user is owner of message, proceed w/ update
                message.msgText = req.body.msgText;
                await message.save();
                // send back 204 No Content
                res.sendStatus(204);
            } else {
                // auth user is not owner, unauthorized
                res.sendStatus(401);
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const RemoveMessage = async (req, res) => {
    try {
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message) {
            // there wasn't an error, but the message wasn't found
            // i.e. the id given doesn't match any in the database
            res.sendStatus(404);
        } else {
            // message found - is the user authorized?
            if (message.name === req.user.username) {
                // auth user is owner of message, proceed w/ update
                await message.remove();
                // send back 204 No Content
                res.sendStatus(204);
            } else {
                // auth user is not owner, unauthorized
                res.sendStatus(401);
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export { getAllMessages, addNewMessage, UpdateMessage, RemoveMessage };

