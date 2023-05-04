const states = require("../model/states");

//Get all states
const GetStates = async (req, res) => {
    const { state } = await states.find();
    if (!state)
        return res.status(400).json({message: "No state found."});
    res.json(state)
};

//Create a new state
const Newstates = async (req, res) => {
    if (!req.body.name || req.body.stateCode) {
        return res.status(400)
        .json({message: "State name and code are required!!"});
    }

    try {
        const result = await states.create({
            name: req.body.name,
            stateCode: req.body.stateCode });
            res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }
};

//Update state
const updateState = async (req, res) => {
    if (!req.body.id) {
        return res
        .status(400)
        .json({message: "Id parameter is required"});
    }
    const state = await states.findById(req.body.id).exec();

    if (!state) {
        return res.status(204)
        .json({message: 'No state matches this ID ${req.body.id}'});
    }
    if (req.body.name) state.name = req.body.name;
    if (req.body.stateCode) state.stateCode = req.body.stateCode;

    const result = await states.save();
    res.json(result);

};

//Delete Employee
const removeState = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({message: "State ID is required. "});
    }

    const State = await states.findOne({_id: req.body.id}).exec();

    if (!state) {
        return res
            .status(204)
            .json({message: 'No Employee matches ID $req.body.id'});
    }

    const result = await states.deleteOne({_id:req.body.id});
    res.json(result);
};

//Get state
const Getstate = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({message: "State ID is required. "});
    }

    const state = await states.findOne({_id: req.params.id}).exec();

    if (!state) {
        return res
            .status(204)
            .json({message: 'No Employee matches ID ${req.params.id}'});
    }

    res.json(state);
};

module.exports = {
    GetStates,
    Newstates,
    updateState,
    removeState,
    Getstate,
}
