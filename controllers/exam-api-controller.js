let labs = [
    { id: 0, labNo: 1, labTopic: 'ICS Review: A Message Board SPA'},
    { id: 1, labNo: 2, labTopic: 'Porting your MB SPA to Next.js and Adding a Form'},
    { id: 2, labNo: 3, labTopic: 'Designing a RESTful API for the Message Board App'}
];

const getLabs = (req, res) => {
    try {
        res.status(200)
            .json(labs)
    } catch (err)
    {
        res.status(400)
            .send('Bad Request')
    }
};

export { getLabs };